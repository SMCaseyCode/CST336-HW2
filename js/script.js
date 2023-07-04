document.querySelector("#submit-btn").addEventListener("click", sendData);
document.querySelector("#input-item").addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 13) {
        sendData();
    }
})

let todoList = [];

// Main driver function
function sendData() {
    let newItem = document.querySelector("#input-item").value;
    document.querySelector("#input-item").value = '';
    // Clears display 
    clearDisplay();
    
    // Checks if inserted item is valid, if so, add to list
    if (isValid(newItem)) {
        addItem(newItem);
    }
    
    displayItems();
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
    
    for (let i = 0; i < todoList.length; i++){
        itemList.innerHTML += 
            `
             <div class="item-wrapper">
                <div class="item-number">
                    <h3>${i + 1}. </h3>
                </div>
                
                <div class="item-text">
                    <h3>${todoList[i]}</h3>
                </div> 
                
                <div class="item-selections">
                    <input type="checkbox" name="complete">
                </div>
             </div>
            `;
    }
}

function clearDisplay(){
    document.querySelector("#item-list").innerHTML = '';
}