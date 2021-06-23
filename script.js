function addItem() {
    if(!isFormComplete()) {
        alert("Please fill out all fields to add a new list item!");
    }else {
        //create a div with class item to hold item info
        const item = document.createElement("div");
        item.classList.add("item");

        //create to-do item title and add appropriate text
        const itemTitle = document.createElement("h2");
        let input = document.getElementById("add-title").value;
        let text = document.createTextNode(input);
        itemTitle.appendChild(text);

        //create complete button and add onclick functionality and text
        const completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.addEventListener("click", removeItem);
        completeButton.type = "button";
        text = document.createTextNode("Complete Task");
        completeButton.appendChild(text);

        //add h2 and button to earlier div
        item.appendChild(itemTitle);
        item.appendChild(completeButton);

        //add completed div to main list
        const list = document.getElementById("item-list");
        list.appendChild(item);

        //reset form values
        document.getElementById("add-title").value = '';
        //update item counter
        updateCounter(1);
    }
}

function removeItem(eventObj) {
    let item = eventObj.target.parentNode;
    item.remove();
    updateCounter(-1);
}

function isFormComplete() { //returns true if all form fields are complete
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
    let sidebar = document.getElementById("sidebar");
    if(sidebar.classList.contains("visible")) {
        sidebar.classList.remove("visible");
        sidebar.classList.add("hidden");   
    }else {
        sidebar.classList.remove("hidden");
        sidebar.classList.add("visible");
    }
    
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