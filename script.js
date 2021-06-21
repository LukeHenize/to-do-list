function addItem() {
    if(!isFormComplete()) {
        alert("Please fill out all fields to add a new list item!");
    }else {
        const item = document.createElement("div");
        item.classList.add("item");

        const itemTitle = document.createElement("h2");
        let input = document.getElementById("add-title").value;
        let text = document.createTextNode(input);
        itemTitle.appendChild(text);

        const completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.addEventListener("click", removeItem);
        completeButton.type = "button";
        text = document.createTextNode("Complete Task");
        completeButton.appendChild(text);

        item.appendChild(itemTitle);
        item.appendChild(completeButton);

        const list = document.getElementById("item-list");
        list.appendChild(item);

        //reset form values
        document.getElementById("add-title").value = '';
    }
}

function removeItem() {
    console.log("done!");
}

function isFormComplete() {
    let input = document.getElementById("add-title");
    if(input.value == '') {
        return false;
    }

    return true;
}