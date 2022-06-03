let currentDate = dayjs().format("dddd MMMM D YYYY");

$(document).ready(function () {
  $("#currentDay").append(currentDate);
});

const timeBlocksEl = $(".container");

let createTimeBlock = function () {};
