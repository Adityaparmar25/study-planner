var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var emptyBox = document.getElementById("emptyBox");

var completedText = document.getElementById("completed");
var totalText = document.getElementById("total");
var percentText = document.getElementById("percent");
var barFill = document.getElementById("barFill");
var barText = document.getElementById("barText");

var examName = document.getElementById("examName");
var examDate = document.getElementById("examDate");
var examBtn = document.getElementById("examBtn");
var examText = document.getElementById("examText");


var tasks = [];


function addTask() {
    var text = taskInput.value;

    // do not add an empty task
    if (text.trim() == "") {
        alert("Please enter a task first!");
        return;
    }

    var task = {
        name: text,
        done: false
    };
    tasks.push(task);

    taskInput.value = "";
    showTasks();
}

function showTasks() {
    taskList.innerHTML = "";

    // make one list item for every task
    for (var i = 0; i < tasks.length; i++) {
        var li = document.createElement("li");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tasks[i].done;
        checkbox.setAttribute("onclick", "toggleTask(" + i + ")");

        var name = document.createElement("span");
        name.textContent = tasks[i].name;
        if (tasks[i].done == true) {
            name.className = "done";
        }

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.setAttribute("onclick", "deleteTask(" + i + ")");

        li.appendChild(checkbox);
        li.appendChild(name);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    if (tasks.length == 0) {
        emptyBox.style.display = "block";
    } else {
        emptyBox.style.display = "none";
    }

    showProgress();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    showTasks();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        addTask();
    }
});


function showProgress() {
    var total = tasks.length;
    var completed = 0;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].done == true) {
            completed++;
        }
    }

    var percent = 0;
    if (total > 0) {
        percent = Math.round((completed / total) * 100);
    }

    completedText.textContent = completed;
    totalText.textContent = total;
    percentText.textContent = percent + "%";
    barText.textContent = percent + "%";
    barFill.style.width = percent + "%";
}


function setExam() {
    var name = examName.value;
    var date = examDate.value;

    if (name.trim() == "" || date == "") {
        examText.textContent = "Please enter the exam name and date.";
        return;
    }

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var exam = new Date(date);
    exam.setHours(0, 0, 0, 0);

    // one day has 1000 * 60 * 60 * 24 milliseconds
    var difference = exam - today;
    var days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (days > 1) {
        examText.textContent = name + " is in " + days + " days.";
    } else if (days == 1) {
        examText.textContent = name + " is tomorrow!";
    } else if (days == 0) {
        examText.textContent = name + " is today. All the best!";
    } else {
        examText.textContent = "This exam date has already passed.";
    }
}

examBtn.addEventListener("click", setExam);



var menuLinks = document.querySelectorAll("nav a");

for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", function () {
        // remove active from all links
        for (var j = 0; j < menuLinks.length; j++) {
            menuLinks[j].classList.remove("active");
        }
        // add active to the clicked link
        this.classList.add("active");
    });
}

// show the starting values
showTasks();