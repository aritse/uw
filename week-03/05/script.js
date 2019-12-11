const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

hours.forEach(hour => {
  var now = moment().hour();
  var timeblockDiv = $("<div>").attr({ class: "timeblock-div", "data-time": hour });
  var hourSpan = $("<span>");
  hourSpan.text(moment(hour, ["H"]).format("hA")).addClass("hour-span");
  var eventInput = $("<input>").attr({ type: "text", width: "100%" });
  if (hour < now) eventInput.attr("class", "past");
  else if (hour > now) eventInput.addClass("future");
  else eventInput.addClass("present");
  eventInput.val(localStorage.getItem(hour));
  var saveButton = $("<button>");
  saveButton.text("Save").attr({ type: "button", class: "saveBtn" });
  timeblockDiv.append(hourSpan, eventInput, saveButton);
  $(".container").append(timeblockDiv);
});

$(document).on("click", ".saveBtn", event => {
  event.preventDefault();
  var saveButton = event.target;
  var eventInput = saveButton.previousSibling;
  var hourSpan = saveButton.previousSibling.previousSibling;
  localStorage.setItem(moment(hourSpan.innerText, ["HA"]).format("H"), eventInput.value);
});
