document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(taskText => renderTask(taskText));

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        renderTask(taskText);
        savedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(savedTasks)); // Save
        taskInput.value = "";
    }

    function renderTask(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete-btn";
        
        deleteBtn.addEventListener("click", () => {
            li.remove();
            savedTasks = savedTasks.filter(task => task !== taskText);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
});
