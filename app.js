document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('new-todo');
    const addButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    let todos = [];

    // Function to render the to-do list
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = todo.done ? 'completed' : '';
            li.innerHTML = `
                <input type="checkbox" ${todo.done ? 'checked' : ''} data-index="${index}" class="checkbox">
                ${todo.text}
                <div>
                    <button class="edit-button" data-index="${index}">Edit</button>
                    <button class="delete-button" data-index="${index}">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }

    // Function to add a new to-do
    function addTodo() {
        const newTodoText = todoInput.value.trim();
        if (newTodoText) {
            todos.push({ text: newTodoText, done: false });
            todoInput.value = '';
            renderTodos();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a to-do.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    // Function to edit a to-do
    function editTodo(index) {
        Swal.fire({
            title: 'Edit your to-do',
            input: 'text',
            inputValue: todos[index].text,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                }
            }
        }).then(result => {
            if (result.isConfirmed) {
                todos[index].text = result.value;
                renderTodos();
            }
        });
    }

    // Function to delete a to-do
    function deleteTodo(index) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to recover this to-do!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(result => {
            if (result.isConfirmed) {
                todos.splice(index, 1);
                renderTodos();
                Swal.fire(
                    'Deleted!',
                    'Your to-do has been deleted.',
                    'success'
                );
            }
        });
    }

    // Function to toggle the "done" state of a to-do
    function toggleDone(index) {
        todos[index].done = !todos[index].done;
        renderTodos();
    }

    // Event listener for the Add button
    addButton.addEventListener('click', addTodo);

    // Event listener for the Edit, Delete buttons and Checkboxes in the to-do list
    todoList.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        if (e.target.classList.contains('edit-button')) {
            editTodo(index);
        } else if (e.target.classList.contains('delete-button')) {
            deleteTodo(index);
        } else if (e.target.classList.contains('checkbox')) {
            toggleDone(index);
        }
    });

    // Initial render of the to-do list
    renderTodos();
});
