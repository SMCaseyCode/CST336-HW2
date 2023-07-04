document.querySelector("#submit-btn").addEventListener("click", sendData);
document.querySelector("#remove-completed-btn").addEventListener("click", deleteChecked);
document.querySelector("#input-item").addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 13) {
        sendData();
    }
})

let todoList = JSON.parse(localStorage.items);
localStorage.setItem("items", JSON.stringify(todoList));

displayItems();

// Main driver function
function sendData() {
    let newItem = document.querySelector("#input-item").value;
    document.querySelector("#input-item").value = '';
    
    // Checks if inserted item is valid, if so, add to list
    if (isValid(newItem)) {
        addItem(newItem);
    }
    
    displayItems();
    editChecked();
}

function isValid(newItem) {
    newItem = newItem.replace(/\s+/g, '');
    return newItem !== '';
}

function addItem(newItem) {
    todoList.push(newItem);
}

function displayItems(){
    let itemList = document.querySelector("#item-list");
    document.querySelector("#no-items").innerHTML = '';
    localStorage.items = JSON.stringify(todoList);

    // Clears display
    clearDisplay();
    todoList = JSON.parse(localStorage.items);
    for (let i = 0; i < todoList.length; i++){
        itemList.innerHTML += 
            `
             <div class="item-wrapper">
                <div class="item-number">
                    <h3>${i + 1}. </h3>
                </div>
                
                <div class="item-text">
                    <h3 id="item${i}">${todoList[i]}</h3>
                </div> 
                
                <div class="item-selections">
                    <input type="checkbox" name="complete" id="checkbox${i}"/>
                </div>
             </div>
            `;
    }
    
    if (todoList.length === 0){
        document.querySelector("#no-items").innerHTML = `<img src="img/no-items.png" alt="No items found"/>`;
        document.querySelector("#remove-completed-btn").style.visibility = "hidden";
    }else {
        document.querySelector("#remove-completed-btn").style.visibility = "visible";
    }
}

function deleteChecked() {
    for (let i = todoList.length - 1; i >= 0; i--){
        let isChecked = document.getElementById(`checkbox${i}`).checked;
        
        if (isChecked){
            todoList.splice(i, 1);
        }
    }
    
    displayItems();
}

function editChecked(){
    for (let i = 0; i < todoList.length; i++){
        let isChecked = document.getElementById(`checkbox${i}`).checked;

        if (isChecked){
            document.getElementById(`#item${i}`).style.textDecoration = "line-through";
        }
    }
}

function clearDisplay(){
    document.querySelector("#item-list").innerHTML = '';
}