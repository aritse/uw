var box = document.querySelector("#box");
var growButton = document.querySelector("#Grow");
var blueButton = document.querySelector("#Blue");
var fadeButton = document.querySelector("#Fade");
var resetButton = document.querySelector("#Reset");
var roundButton = document.querySelector("#Round");
var initialStyle = box.getAttribute("style");

// growButton.addEventListener("click", () => {
//   var boxStyle = box.getAttribute("style");
//   var match = boxStyle.match(/height:(\d+)px/);
//   var height = (match[1] * 1.2) | 0;
//   boxStyle = boxStyle.replace(/height:(\d+)px/, `height:${height}px`);
//   match = boxStyle.match(/width:(\d+)px/);
//   var width = (match[1] * 1.2) | 0;
//   boxStyle = boxStyle.replace(/width:(\d+)px/, `width:${width}px`);
//   box.setAttribute("style", boxStyle);
// });

growButton.addEventListener("click", () => {
  var w = parseInt(box.style.width.slice(0, -2));
  var h = parseInt(box.style.height.slice(0, -2));

  box.style.width = w * 1.2 + "px";
  box.style.height = h * 1.2 + "px";
});

blueButton.addEventListener("click", () => {
  var boxStyle = box.getAttribute("style");
  boxStyle = boxStyle.replace("orange", "blue");
  box.setAttribute("style", boxStyle);
});

fadeButton.addEventListener("click", () => {
  box.style.opacity = box.style.opacity ? box.style.opacity / 1.1 : 0.9;
});

roundButton.addEventListener("click", () => {
  if (box.style.borderRadius) {
    var r = parseInt(box.style.borderRadius.slice(0, -2));
    box.style.borderRadius = r * 1.2 + "px";
  } else {
    box.style.borderRadius = "5px";
  }
});

resetButton.addEventListener("click", () => {
  box.setAttribute("style", initialStyle);
});
