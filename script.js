const taskBox = document.querySelector('.tasks');
const addNewTask = document.querySelector('.add');
const Card = document.querySelector('.box');
const taskContainer = document.querySelector(".taskContainer");
const deleteBtn = document.querySelector('.remove');
const input = document.querySelector('.input');
const checkbtn = document.querySelector('.checkbtn');
const tickedbtn = document.querySelector('.tickedbox');
let ButtonChecked = false;


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


//  for all other cloned tasks 
addNewTask.addEventListener('click', function (event) {
    event.preventDefault();

    const clone = taskBox.cloneNode(true);
    clone.querySelector('.input').value = "";
    // setting to default value for checkbox icon
    clone.querySelector('.checkbtn').style.zIndex = "0";
    clone.querySelector('.checkbtn').style.position = "relative";
    
    clone.querySelector('.tickedbox').style.zIndex = "-1";
    clone.querySelector('.tickedbox').style.position = "absolute";

    clone.querySelector('.input').style.textDecoration = "none";
    clone.querySelector('.input').style.opacity = "1";

    clone.querySelector('.remove').addEventListener('click', function () {
        clone.remove();
    });

    clone.querySelector('.checkbtn').addEventListener('click', function () {
        clone.querySelector('.checkbtn').style.zIndex = "-1";
        clone.querySelector('.checkbtn').style.position = "absolute";

        clone.querySelector('.tickedbox').style.zIndex = "0";
        clone.querySelector('.tickedbox').style.position = "relative";

        clone.querySelector('.input').style.textDecoration = "line-through";
        clone.querySelector('.input').style.opacity = "0.5";

    });

    clone.querySelector('.tickedbox').addEventListener('click', function () {
        clone.querySelector('.checkbtn').style.zIndex = "0";
        clone.querySelector('.checkbtn').style.position = "relative";

        clone.querySelector('.tickedbox').style.zIndex = "-1";
        clone.querySelector('.tickedbox').style.position = "absolute";

        clone.querySelector('.input').style.textDecoration = "none";
        clone.querySelector('.input').style.opacity = "1";
    });

    taskContainer.appendChild(clone);
});

