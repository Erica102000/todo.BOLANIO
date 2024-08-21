// Initialize an array to store tasks
let tasks = [];

// Function to render the task list
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the list before re-rendering

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        li.appendChild(taskText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        tasks.push({ text: taskText });
        taskInput.value = '';
        renderTasks();
    } else {
        alert('Please enter a task.');
    }
}

// Function to edit a task
function editTask(index) {
    const newTaskText = prompt('Edit task:', tasks[index].text);

    if (newTaskText !== null) {
        tasks[index].text = newTaskText.trim();
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

// Initial rendering of tasks
renderTasks();
