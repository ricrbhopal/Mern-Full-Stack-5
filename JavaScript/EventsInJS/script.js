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
