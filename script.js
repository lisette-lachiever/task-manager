let tasks = [];
let currentFilter = 'all';


const taskInput = document.getElementById("taskInput");
const taskDueDate = document.getElementById("taskDueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const filterBtns = document.querySelectorAll(".filter-btn");


function init() {
    loadTasksFromStorage();
    attachEventListeners();
    renderTasks();
}


function loadTasksFromStorage() {
    try {
        const stored = localStorage.getItem("tasks");
        tasks = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(tasks)) tasks = [];
    } catch {
        tasks = [];
    }
}


function saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}


function addTask() {
    const title = taskInput.value.trim();
    if (!title) {
        taskInput.focus();
        return;
    }

    tasks.push({
        id: generateId(),
        title,
        completed: false,
        dueDate: taskDueDate.value || null
    });

    saveTasksToStorage();
    renderTasks();

    taskInput.value = "";
    taskDueDate.value = "";
    taskInput.focus();
}


function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    task.completed = !task.completed;
    saveTasksToStorage();
    renderTasks();
}


function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasksToStorage();
    renderTasks();
}


function filterTasks() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    
    return tasks.filter(task => {
        const taskDate = task.dueDate ? new Date(task.dueDate) : null;
        if (taskDate) {
            taskDate.setHours(0, 0, 0, 0);
        }
        
        switch(currentFilter) {
            case 'all':
                return true;
                
            case 'today':
                // Tasks due today and not completed
                return taskDate && taskDate.getTime() === today.getTime() && !task.completed;
                
            case 'week':
                // Tasks due within next 7 days and not completed
                return taskDate && taskDate >= today && taskDate <= weekFromNow && !task.completed;
                
            case 'overdue':
                // Tasks past due and not completed
                return taskDate && taskDate < today && !task.completed;
                
            case 'completed':
                // Only completed tasks
                return task.completed;
                
            default:
                return true;
        }
    });
}


function setFilter(filter) {
    currentFilter = filter;
    
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderTasks();
}


function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = filterTasks();

    if (filteredTasks.length === 0) {
        emptyState.classList.add("visible");
        emptyState.textContent = currentFilter === 'all' 
            ? 'No tasks yet. Add one to get started.' 
            : `No ${currentFilter} tasks.`;
    } else {
        emptyState.classList.remove("visible");

        filteredTasks.forEach(task => {
            taskList.appendChild(createTaskElement(task));
        });
    }

    updateCounters();
}


function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.title;
    
    
    if (task.dueDate) {
        const dueText = document.createElement("span");
        dueText.style.fontSize = "12px";
        dueText.style.color = "#8a9a8a";
        dueText.style.marginLeft = "8px";
        dueText.textContent = `(Due: ${new Date(task.dueDate).toLocaleDateString()})`;
        text.appendChild(dueText);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", e => {
        e.stopPropagation();
        deleteTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    return li;
}


function updateCounters() {
    totalTasksEl.textContent = tasks.length;
    completedTasksEl.textContent = tasks.filter(t => t.completed).length;
}


function attachEventListeners() {
    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            addTask();
        }
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            setFilter(btn.dataset.filter);
        });
    });
}


init();