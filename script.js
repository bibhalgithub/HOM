let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function renderTasks() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'pending') return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                ${!task.completed ? `<button class="done-button" onclick="toggleComplete(${index})">complete</button>` : ''}
                <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskListElement.appendChild(listItem);
    });
}

function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        tasks.unshift({ text: taskText, completed: false, createdAt: Date.now() });
        newTaskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = true;
    saveTasks();
    renderTasks();
}

function filterTasks(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-sort button').forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase() === filter) {
            button.classList.add('active');
        }
    });
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks(); 