function On() {
  document.getElementById("bulb").style.backgroundColor = "yellow";
}
function Off() {
  document.getElementById("bulb").style.backgroundColor = "white";
}

const userColor = document.getElementById("color");

userColor.addEventListener("change", () => changeBulbColour(userColor.value));

function changeBulbColour(color) {
  document.getElementById("bulb").style.backgroundColor = color;
}

function SB_Control() {
  const btn = document.getElementById("SB_btn");
  if (btn.innerText === "On") {
    document.getElementById("SB_btn").innerText = "Off";
    document.getElementById("smartBulb").classList.add("on");
  } else {
    document.getElementById("SB_btn").innerText = "On";
    document.getElementById("smartBulb").classList.remove("on");
  }
}

function SB_Control2() {
  document.getElementById("smartBulb").classList.toggle("on");
}

function fillColour(Color) {
  console.log(Color);
  document.getElementById("rainbowbulb").style.backgroundColor = Color;
  document.getElementById("rainbowbulb").style.borderColor = Color;
}

document.getElementById("c1").addEventListener("mouseenter", () => {
  fillColour("violet");
});
document.getElementById("c1").addEventListener("mouseleave", () => {
  fillColour("white");
});

document.getElementById("c2").addEventListener("mouseenter", () => {
  fillColour("indigo");
});
document.getElementById("c2").addEventListener("mouseleave", () => {
  fillColour("white");
});

document.getElementById("c3").addEventListener("mouseenter", () => {
  fillColour("blue");
});
document.getElementById("c3").addEventListener("mouseleave", () => {
  fillColour("white");
});

document.getElementById("c4").addEventListener("mouseenter", () => {
  fillColour("green");
});
document.getElementById("c4").addEventListener("mouseleave", () => {
  fillColour("white");
});

document.getElementById("c5").addEventListener("mouseenter", () => {
  fillColour("yellow");
});
document.getElementById("c5").addEventListener("mouseleave", () => {
  fillColour("white");
});

document.getElementById("c6").addEventListener("mouseenter", () => {
  fillColour("orange");
});
document.getElementById("c6").addEventListener("mouseleave", () => {
  fillColour("white");
});

document.getElementById("c7").addEventListener("mouseenter", () => {
  fillColour("red");
});
document.getElementById("c7").addEventListener("mouseleave", () => {
  fillColour("white");
});