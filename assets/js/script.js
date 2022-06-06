// Div holding time blocks
const timeBlocksEl = $(".container");
// Save buttons
let saveBtn = $(".saveBtn");
// Current date
let currentDate = dayjs().format("dddd MMMM D YYYY");
// Current time (hr)
let currentTime = dayjs().hour();

// Task Array
let tasks = [];

// Load in saved tasks from local storage
const loadTasks = function () {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  // If local storage is empty, replace with empty array
  if (!tasks) {
    tasks = [];
  }
  // Loop over objects in tasks array
  for (i = 0; i < tasks.length; i++) {
    // If empty object, replace with placeholder items
    if (!tasks[i]) {
      tasks[i] = {
        time: i + 9,
        task: "",
      };
    }
    // Push time and task information to createTask function
    createTask(parseInt(tasks[i].time), tasks[i].task);
  }
};

// Create task using taskTime and taskText
let createTask = function (taskTime, taskText) {
  // Select proper textarea by targeting id
  let taskHolder = $(`textarea[id=${taskTime}]`)[0];
  // Add value to textarea using taskText passed into function
  $(taskHolder).val(taskText);
};

// On document load, update current date
$(document).ready(function () {
  $("#currentDay").append(currentDate);
});

// Set background for each timeblock
let setBackground = function () {
  // Find and store elements with the data-task attribute
  let findTasks = timeBlocksEl.find(`[data-task]`);
  // Loop through each object stored
  for (i = 0; i < findTasks.length; i++) {
    let filterTask = findTasks[i];
    // If the currentTime (in hours) is > current timeBlock, set background to 'past'
    if (currentTime > filterTask.dataset.task) {
      $(filterTask).addClass("past");
      // If the currentTime (in hours) is < current timeBlock, set background to 'future'
    } else if (currentTime < filterTask.dataset.task) {
      $(filterTask).addClass("future");
      // Otherwise it must be the present
    } else {
      $(filterTask).addClass("present");
    }
  }
};

// When save button is clicked...
$(".saveBtn").on("click", function (event) {
  // Find button's parent
  let selectedTask = $(event.target).parent();
  // Set variable to the dataset corresponding to button/task
  selectedTask = selectedTask[0].dataset.task;
  // Gather text within textarea
  let taskText = $(event.target).prev().find("textarea").val();
  // Set selected task's object array
  tasks[selectedTask - 9] = {
    time: selectedTask,
    task: taskText,
  };
  // Save to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

// Clear saved tasks
$("#clear").on("click", function () {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  window.location.reload();
});

setInterval(setBackground(), 60000);
loadTasks();
