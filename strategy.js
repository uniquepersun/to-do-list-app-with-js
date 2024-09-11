const input = document.getElementById('take_task')
const button = document.getElementById('remember')
const list = document.getElementById('tasks_list')

function saveTasksToLocalStorage() {
    const tasks = Array.from(list.children).map(li => ({
        text: li.querySelector('.task-text').textContent,
        completed: li.querySelector('input[type="checkbox"]').checked
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
        || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.textContent = 'edit';
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'forget';
        if (task.completed) {
            taskText.classList.add('completed');
        }
        list.appendChild(li);
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log('Tasks loaded from local storage:', tasks);
    });
}
button.addEventListener('click', () => {
    const tasks_text = input.value.trim();
    if (tasks_text !== '') {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = tasks_text;
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.textContent = 'change';
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'forget';

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        list.appendChild(li);
        input.value = '';

    }
    saveTasksToLocalStorage();
});

list.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        event.target.parentElement.remove();
    } else if (event.target.classList.contains('edit-button')) {
        const taskText = event.target.previousElementSibling;
        const newTask = prompt('Edit task:', taskText.textContent);
        if (newTask !== null) {
            taskText.textContent = newTask;
        }
    }
    saveTasksToLocalStorage();

});

list.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        const taskText = event.target.nextElementSibling;
        if (event.target.checked) {
            taskText.classList.add('completed');
        } else {
            taskText.classList.remove('completed');


        }
    }
    saveTasksToLocalStorage();
});
window.addEventListener('load', loadTasksFromLocalStorage);

