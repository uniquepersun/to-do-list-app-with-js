const input = document.getElementById('take_task')
const button = document.getElementById('remember')
const list = document.getElementById('tasks_list')

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
});
