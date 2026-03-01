const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
function addTask() {
    const taskText = input.value.trim();

    if(taskText === "") return;

    tasks.push(taskText);
    saveTasks();
    renderTasks();
    input.value = "";
}

// Render Tasks
function renderTasks(){
    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{
        const li = document.createElement("li");
        li.textContent = task;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("delete");

        delBtn.onclick = ()=>{
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

// Save to LocalStorage
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Events
addBtn.addEventListener("click", addTask);

input.addEventListener("keypress",(e)=>{
    if(e.key === "Enter") addTask();
});

renderTasks();