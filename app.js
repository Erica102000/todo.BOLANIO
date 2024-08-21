// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById('taskList');
        
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        
        // Add task text
        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        listItem.appendChild(taskContent);
        
        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            editTask(listItem, taskText);
        };
        listItem.appendChild(editButton);
        
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            deleteTask(listItem);
        };
        listItem.appendChild(deleteButton);
        
        // Append to list
        taskList.appendChild(listItem);
        
        // Clear input
        taskInput.value = '';
    }
}

// Function to edit a task
function editTask(listItem, oldText) {
    const newText = prompt('Edit task:', oldText);

    if (newText !== null && newText.trim() !== '') {
        listItem.querySelector('span').textContent = newText;
    }
}

// Function to delete a task
function deleteTask(listItem) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(listItem);
}
