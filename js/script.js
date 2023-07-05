// Calls sendData when the `Add` button is pressed
document.querySelector("#submit-btn").addEventListener("click", sendData);

// Calls deleteChecked when `Remove Completed Tasks` button is pressed
document.querySelector("#remove-completed-btn").addEventListener("click", deleteChecked);

// Allows user to press `Enter` instead of the `Add` button
document.querySelector("#input-item").addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 13) {
        sendData();
    }
});

// Fills todoList with current items in localStorage (if any)
// JSON format lets us save more than just Strings
let todoList = [];
if (localStorage.getItem("items") !== null) {
    todoList = JSON.parse(localStorage.items) || [];
}
displayItems();

// Main driver function
function sendData() {
    const newItem = document.querySelector("#input-item").value;
    
    // Resets input box after submission
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
    // This checks to see if input is just empty space
    newItem = newItem.replace(/\s+/g, '');
    return newItem !== '';
}


// Adds item to list
function addItem(newItem) {
    todoList.push({text: newItem, checked: false});
}


// Displays Items + gives listeners
function displayItems(){
    const itemList = document.querySelector("#item-list");
    document.querySelector("#no-items").innerHTML = '';

    // Clears display
    clearDisplay();
    
    // Fills HTML with items from todoList
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

    // Gives all checkboxes eventListeners; When changed, calls editChecked function
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            editChecked(index);
        });
    });

    // Gives all delete buttons eventListeners; When clicked, calls deleteItem function
    deleteButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            deleteItem(index);
        });
    });
    
    // If list is empty, show `no-items.png`. Also hides/shows `Remove Completed Tasks` button
    if (todoList.length === 0){
        document.querySelector("#no-items").innerHTML = `<img src="img/no-items.png" alt="No items found"/>`;
        document.querySelector("#remove-completed-btn").style.visibility = "hidden";
    }else {
        document.querySelector("#remove-completed-btn").style.visibility = "visible";
    }
}


// Deletes all `completed` tasks
function deleteChecked() {
    // Reversed because removing indexes while increasing `i` value is a bad idea, reversing fixes this
    for (let i = todoList.length - 1; i >= 0; i--){
        const isChecked = document.getElementById(`checkbox${i}`).checked;
        
        // if item is marked as complete, remove that item from todoList
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
    const isChecked = document.getElementById(`checkbox${index}`).checked;
        
    todoList[index].checked = isChecked;

    const itemText = document.getElementById(`item${index}`);

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