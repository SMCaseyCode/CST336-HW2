document.querySelector("#submit-btn").addEventListener("click", sendData);
document.querySelector("#remove-completed-btn").addEventListener("click", deleteChecked);
document.querySelector("#input-item").addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 13) {
        sendData();
    }
})

let todoList = JSON.parse(localStorage.items);
displayItems();

// Main driver function
function sendData() {
    let newItem = document.querySelector("#input-item").value;
    document.querySelector("#input-item").value = '';
    
    // Checks if inserted item is valid, if so, add to list
    if (isValid(newItem)) {
        addItem(newItem);
        localStorage.setItem("items", JSON.stringify(todoList));
    }
    
    displayItems();
}




/////////////////// SUPPORTING FUNCTIONS ///////////////////


// Checks Validity of input
function isValid(newItem) {
    newItem = newItem.replace(/\s+/g, '');
    return newItem !== '';
}


// Adds item to list
function addItem(newItem) {
    todoList.push({text: newItem, checked: false});
}


// Displays Items + gives listeners
function displayItems(){
    let itemList = document.querySelector("#item-list");
    document.querySelector("#no-items").innerHTML = '';

    // Clears display
    clearDisplay();
    
    todoList.forEach((arrItem, index) => {
        const item = todoList[index];
        const isChecked = item.checked;

        itemList.innerHTML +=
            `
             <div class="item-wrapper">
                <div class="item-number">
                    <h3>${index + 1}. </h3>
                </div>
                
                <div class="item-text">
                    <h3 id="item${index}" ${isChecked ? 'style="text-decoration: line-through;"' : ''}>${item.text}</h3>
                </div> 
                
                <div class="item-selections">
                    <input type="checkbox" name="complete" id="checkbox${index}" ${item.checked ? 'checked' : ''}/>
                </div>
                <div class="item-selections-remove">
                    <input type="image" src="img/delete-button.png" alt="remove" name="remove" id="removeimg${index}"/>
                </div>
             </div>
            `;
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const deleteButtons = document.querySelectorAll('input[type="image"]');

    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            editChecked(index);
        });
    });

    deleteButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            deleteItem(index);
        });
    });
    
    if (todoList.length === 0){
        document.querySelector("#no-items").innerHTML = `<img src="img/no-items.png" alt="No items found"/>`;
        document.querySelector("#remove-completed-btn").style.visibility = "hidden";
    }else {
        document.querySelector("#remove-completed-btn").style.visibility = "visible";
    }
}


// Deletes all `completed` tasks
function deleteChecked() {
    for (let i = todoList.length - 1; i >= 0; i--){
        let isChecked = document.getElementById(`checkbox${i}`).checked;
        
        if (isChecked){
            todoList.splice(i, 1);
        }
    }
    localStorage.setItem("items", JSON.stringify(todoList));
    displayItems();
}

// Deletes singular entries - triggered by event listener
function deleteItem(index){
    todoList.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(todoList));
    displayItems();
}

// Changes item styling to `line-through` if `completed`
function editChecked(index){
    let isChecked = document.getElementById(`checkbox${index}`).checked;
        
    todoList[index].checked = isChecked;

    let itemText = document.getElementById(`item${index}`);

    if (isChecked){
        itemText.style.textDecoration = "line-through";
    } else {
        itemText.style.textDecoration = "none";
    }
    localStorage.setItem("items", JSON.stringify(todoList));
}

// Clears display for changes
function clearDisplay(){
    document.querySelector("#item-list").innerHTML = '';
}