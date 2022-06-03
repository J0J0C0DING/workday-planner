// Div holding time blocks
const timeBlocksEl = $(".container");
// Description Boxes
const taskEl = $(".description");

let currentDate = dayjs().format("dddd MMMM D YYYY");

$(document).ready(function () {
  $("#currentDay").append(currentDate);
});

let currentTime = dayjs().hour();

taskEl.on("click", function (event) {
  // Select the task clicked on
  let taskChoosen = event.target;
  // Take whatever text is already in the task
  let taskText = taskChoosen.innerHTML;

  $(this).replaceWith(`<textarea class="description">${taskText}</textarea>`);
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

setBackground();
