document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let dueDate = document.getElementById("dueDate");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    let task = {
        text: taskInput.value,
        due: dueDate.value,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    dueDate.value = "";

    loadTasks();
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let taskText = document.createElement("span");
        taskText.textContent = task.text + " (Due: " + (task.due || "No deadline") + ")";
        if (task.completed) taskText.classList.add("completed");

        let completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.onclick = () => toggleComplete(index);

        let editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.classList.add("edit");
        editBtn.onclick = () => editTask(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete");
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(taskText);
        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let newText = prompt("Edit task:", tasks[index].text);
    let newDate = prompt("Edit due date:", tasks[index].due);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        tasks[index].due = newDate;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}