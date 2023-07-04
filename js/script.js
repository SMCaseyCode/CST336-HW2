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

function isValid(newItem) {
    newItem = newItem.replace(/\s+/g, '');
    return newItem !== '';
}

function addItem(newItem) {
    todoList.push({text: newItem, checked: false});
}

function displayItems(){
    let itemList = document.querySelector("#item-list");
    document.querySelector("#no-items").innerHTML = '';

    // Clears display
    clearDisplay();
    for (let i = 0; i < todoList.length; i++){
        const item = todoList[i];
        const isChecked = item.checked;
        
        itemList.innerHTML += 
            `
             <div class="item-wrapper">
                <div class="item-number">
                    <h3>${i + 1}. </h3>
                </div>
                
                <div class="item-text">
                    <h3 id="item${i}" ${isChecked ? 'style="text-decoration: line-through;"' : ''}>${item.text}</h3>
                </div> 
                
                <div class="item-selections">
                    <input type="checkbox" name="complete" id="checkbox${i}" ${item.checked ? 'checked' : ''}/>
                </div>
             </div>
            `;

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        // Not going to lie, ripped this from StackOverflow
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener("change", () => {
                editChecked(index);
            });
        });
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
    localStorage.setItem("items", JSON.stringify(todoList));
    displayItems();
}

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

function clearDisplay(){
    document.querySelector("#item-list").innerHTML = '';
}