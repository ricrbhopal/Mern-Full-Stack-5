function Input(char) {
  if (char === "=") {
    document.getElementById("display").value = "result";
  } else if (char === "C") {
    document.getElementById("display").value = "";
  } else {
    document.getElementById("display").value = char;
  }
}
