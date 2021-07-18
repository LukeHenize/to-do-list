let tasks = []; //holds order of tasks for easier deletion
let timers = []; //holds timer data for each task
let completedTasks = []; //holds tasks that the user has marked as complete

function addItem() {
    if(!isFormComplete()) {
        alert(`Please fill out the "Task Name" field!`);
    }else {
        //create a div with class item to hold item info
        const item = document.createElement("div");
        item.classList.add("item");

        //create to-do item title and add appropriate text
        const itemTitle = document.createElement("h2");
        let input = document.getElementById("add-title").value;

        
        //continue DOM stuff
        let text = document.createTextNode(input);
        itemTitle.appendChild(text);

        //create <p> to hold description (optional)
        let info = document.getElementById("add-desc");
        const description = document.createElement("p");
        if(info.value != '') {
            input = info.value;
            text = document.createTextNode(input);
            description.appendChild(text);
            description.style.padding = "0px 15px 0px 15px";
        } 

        //create timer to track task time
        const timer = document.createElement("h3");
        text = document.createTextNode("Posted just now");
        timer.appendChild(text);

        //create complete button and add onclick functionality and text
        const completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.addEventListener("click", removeItem);
        completeButton.type = "button";
        text = document.createTextNode("Complete Task");
        completeButton.appendChild(text);

        //add h2, p and button to earlier div
        item.appendChild(itemTitle);
        item.appendChild(timer);
        if(info.value != '') {
            item.appendChild(description);
        }
        item.appendChild(completeButton);
        

        //add completed div to main list
        const list = document.getElementById("item-list");
        list.appendChild(item);
        tasks.push(item);
        //reset form values
        document.getElementById("add-title").value = '';
        info.value = '';
        //update item counter
        updateCounter(1);
    }
}

function removeItem(eventObj) {
    let indexMatch = -1;
    let item = eventObj.target.parentNode;
    let title = Array.from(item.childNodes)[0];
    
    for(let i=0; i < tasks.length; i++) {
        let childNodes = Array.from(tasks[i].childNodes);
        if(childNodes[0] == title) {
            indexMatch = i;
        }
    }
    //add task to completed list
    let div = document.createElement("div");
    div.style.backgroundColor = "#4d4d4d";
    div.style.padding = "5px";
    div.style.margin = "5px 0px 5px 0px";
    let h2 = document.createElement("h2");
    let text = document.createTextNode(title.innerHTML);
    console.log(title);
    h2.appendChild(text);
    div.appendChild(h2);
    
    let completedList = document.querySelector('#completed-list');
    completedList.appendChild(div);
    console.log(item);

    //remove from arrays and DOM
    tasks.splice(indexMatch, 1);
    timers.splice(indexMatch, 1);
    item.remove(); 
    updateCounter(-1);
}

function isFormComplete() { //returns true if required form fields are complete
    let input = document.getElementById("add-title");
    if(input.value == '') {
        return false;
    }

    return true;
}
let itemCount = 0;
function updateCounter(num) {
    let counter = document.getElementById("item-counter");
    if(num > 0) { //increment
        itemCount++;
        if(itemCount == 1) {
            counter.innerHTML = "You have " + itemCount + " task on your to-do list!";
        }else {
            counter.innerHTML = "You have " + itemCount + " tasks on your to-do list!";
        }
    }else { //decrement
        itemCount--;
        if(itemCount == 0) {
            counter.innerHTML = "You have nothing on your to-do list!";
        }else if(itemCount == 1) {
            counter.innerHTML = "You have " + itemCount + " task on your to-do list!";
        }else {
            counter.innerHTML = "You have " + itemCount + " tasks on your to-do list";
        }
    }
}
function toggleMenu() {
    if(window.innerWidth <= 625) {
        let sidebar = document.getElementById("sidebar");
        let overlay = document.getElementById("translucent");
        if(sidebar.classList.contains("visible")) {
            sidebar.classList.remove("visible");
            sidebar.classList.add("hidden");   

            overlay.style.display = "none";
        }else {
            sidebar.classList.remove("hidden");
            sidebar.classList.add("visible");

            overlay.style.display = "block";
        }  
    }
}
function createTimer() {
    timers.push({ms: 0, mins: 0});
}
function updateTimers() {
    timers = timers.map((timer, index) => {
        timer.ms += 60000;
        if(timer.ms == 60000) {
            timer.ms = 0;
            timer.mins++;
            //edit innerHTML
            let taskList = Array.from(document.querySelectorAll('.item')); //get all divs
            let taskTitle = taskList[index + 1].childNodes[1]; //get h3 "timer"
            if(timer.mins == 1) {
                taskTitle.innerHTML = "Posted " + timers[index].mins + " minute ago";
            }else {
                taskTitle.innerHTML = "Posted " + timers[index].mins + " minutes ago";
            }
        }
        return timer; //return is needed for map
    });
}
function init() {
    const vw = document.documentElement.clientWidth;
    let sidebar = document.getElementById("sidebar");
    if(vw <= 625) {
        sidebar.classList.add("hidden");
    }else { //create popup
        sidebar.classList.add("visible");
    }
}
window.onload = init;
setInterval(updateTimers, 5000);