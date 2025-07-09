const taskBox = document.querySelector('.tasks');
const addNewTask = document.querySelector('.add');
const Card = document.querySelector('.box');
const taskContainer = document.querySelector(".taskContainer");
const deleteBtn = document.querySelector('.remove');
const input = document.querySelector('.input');
const checkbtn = document.querySelector('.checkbtn');
const tickedbtn = document.querySelector('.tickedbox');
let ButtonChecked = false;

function getTaskFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTaskToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// For the first task only 
deleteBtn.addEventListener('click', function () {
    taskBox.remove();
});

checkbtn.addEventListener('click', function () {
    ButtonChecked = false;
    checkbtn.style.zIndex = "-1";
    checkbtn.style.position = "absolute";

    tickedbtn.style.zIndex = "0";
    tickedbtn.style.position = "relative";
    input.style.textDecoration = "line-through";
    input.style.opacity = "0.5";
});

tickedbtn.addEventListener('click', function () {
    ButtonChecked = true;
    checkbtn.style.zIndex = "0";
    checkbtn.style.position = "relative";

    tickedbtn.style.zIndex = "-1";
    tickedbtn.style.position = "absolute";
    input.style.textDecoration = "none";
    input.style.opacity = "1";
});

// Impelemented LocalStorage 
addNewTask.addEventListener('click', function (event) {
    event.preventDefault();

    const tasks = getTaskFromStorage();
    const newTask = {
        text: "",
        completed: false,
    };

    tasks.unshift(newTask);
    saveTaskToStorage(tasks);
    renderTasks();
});

function renderTasks() {
    taskContainer.innerHTML = "";

    const tasks = getTaskFromStorage();

    tasks.forEach((task, index) => {
        const clone = taskBox.cloneNode(true);
        const input = clone.querySelector(".input");
        const check = clone.querySelector(".checkbtn");
        const tick = clone.querySelector(".tickedbox");

        input.value = task.text;
        input.addEventListener('input', function () {
            tasks[index].text = input.value;
            saveTaskToStorage(tasks);
        });

        //Status
        if (task.completed) {
            check.style.zIndex = "-1";
            check.style.position = "absolute";

            tick.style.zIndex = "0";
            tick.style.position = "relative";
            input.style.textDecoration = "line-through";
            input.style.opacity = "0.5";
        } else {
            check.style.zIndex = "0";
            check.style.position = "relative";

            tick.style.zIndex = "-1";
            tick.style.position = "absolute";
            input.style.textDecoration = "none";
            input.style.opacity = "1";
        }

        check.addEventListener("click", () => {
            tasks[index].completed = true;
            saveTaskToStorage(tasks);
            renderTasks();
        });

        tick.addEventListener("click", () => {
            tasks[index].completed = false;
            saveTaskToStorage(tasks);
            renderTasks();
        });

        clone.querySelector(".remove").addEventListener("click", function(){
            tasks.splice(index, 1);
            saveTaskToStorage(tasks);
            renderTasks();
        });

        taskContainer.appendChild(clone);
    });

}

window.addEventListener("DOMContentLoaded", renderTasks);