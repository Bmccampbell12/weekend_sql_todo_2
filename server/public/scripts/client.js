console.log('JS is sourced!');
startToDoList();

function startToDoList(){       //loads existing to-do list on page load
console.log('now in startToDoList' );

axios ({
    method: 'GET',
    url: '/todos'
}).then(function(response) {
    console.log('getList() response', response.data);
    renderToDom(response.data);
}).catch(function(error){
    console.log(`error in 'GET' response`, error);
    });

}

function saveToDo(event){
    event.preventDefault();
    let todos = {};
    todos.text = document.getElementById('toDoText').value
    addItem(todos);

    document.getElementById('toDoText').value = "";   // Clears to-do text after addition

}

function addItem(itemToAdd) {
    axios({
        method: 'POST',
        url: '/todos',
        data: itemToAdd,
    }).then(function(response) {
        console.log('addItem()', response.data);
        startToDoList();
    }).catch(function(error) {
console.log("Error in 'POST' Route", error)
        alert('Unable to add an item at at this time, Please try again later');
    });

}

// Displays an Array of To-do tasks to the DOM.
function renderToDom(todos){
    let addItem = document.getElementById('addItem');
    addItem.innerHTML = ' ';
    for(let property of todos){

const completedTask = property.isComplete ? 'completed' : '';

addItem.innerHTML += `
<tr data-testid="toDoItem" class="${completedTask}">
<td >${property.text}</td>
<td>${property.isComplete ? 'true' : 'false'}</td>

<td>
<button class= "delete" data-testid="deleteButton
onClick= "confirm("Confirm Deletion?") ? deleteItem(${property.id}) : null ">Delete</button>
    </td>

    <td >
    ${property.isComplete
        ? ''
        : `<button class= "completed" data-testid="completeButton" onClick="complete(${property.id})">Complete</button>`}
     </td>
     <td>
     ${property.completedAt}
     </td>
  </tr>
  `
  };

}
 function completeToDo(todoId) {
    const currentDay = new Date().toLocaleDateString();  //toISOString() method
    let data = {isComplete: true, completedAt :currentDay};
    console.log('data ', data)

    axios.put(`/todos/${todosId}`, data).then(response => {
        refreshToDo()

    }).catch((error) => {
        console.log('Error', error);
        alert('Oops, something went wrong');
    });

}

function deleteToDo(todosId) {
    console.log('Item deleted with ID:', todosId);
    axios.delete(`/todos/${todosId}`).then((response) => {
        startToDoList()

    }).catch((error) =>{
        console.log('Error', error);
        alert('Oops, something went wrong');
    });
}
