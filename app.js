document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('new-todo');
    const addButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    let todos = [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${todo}
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }

    function addTodo() {
        const newTodo = todoInput.value.trim();
        if (newTodo) {
            todos.push(newTodo);
            todoInput.value = '';
            renderTodos();
        } else {
            swal("Error", "Please enter a to-do", "error");
        }
    }

    function editTodo(index) {
        swal({
            text: "Edit your to-do:",
            content: "input",
            button: {
                text: "Save",
                closeModal: false
            }
        }).then(newTodo => {
            if (newTodo) {
                todos[index] = newTodo;
                renderTodos();
            }
        });
    }

    function deleteTodo(index) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this to-do!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                todos.splice(index, 1);
                renderTodos();
                swal("Poof! Your to-do has been deleted!", {
                    icon: "success",
                });
            }
        });
    }

    addButton.addEventListener('click', addTodo);

    todoList.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        if (e.target.classList.contains('edit-button')) {
            editTodo(index);
        } else if (e.target.classList.contains('delete-button')) {
            deleteTodo(index);
        }
    });

    renderTodos();
});
