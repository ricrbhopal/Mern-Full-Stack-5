let b = 1,
  c = 1,
  g = 0,
  s = 0,
  i = 0;

const img = document.getElementById("image").src;

console.log(img);

if (img === "http://127.0.0.1:5500/JavaScript/ImageEditor/index.html") {
  document.getElementById("image").style.display = "none";
}

function uploadImage() {
  const file = document.getElementById("Upload").files[0];
  const fileURL = URL.createObjectURL(file);

  document.getElementById("image").src = fileURL;
  document.getElementById("image").style.display = "block";
  document.getElementById("uploadLabel").style.display = "none";
  applyFilter();
}

function applyFilter() {
  document.getElementById("image").style.filter = ` brightness(${b}) 
                                                    contrast(${c}) 
                                                    grayscale(${g}%) 
                                                    sepia(${s}%)
                                                    invert(${i}%)`;
}

function changeBrightness() {
  const value = document.getElementById("Brightness").value;
  b = (value * 2) / 100;
  applyFilter();
}

function changeContrast() {
  const value = document.getElementById("Contrast").value;
  c = (value * 2) / 100;
  applyFilter();
}

function changeGrayscale() {
  const value = document.getElementById("Grayscale").value;
  g = value;
  applyFilter();
}

function changeSepia() {
  const value = document.getElementById("Sepia").value;
  s = value;
  applyFilter();
}

function changeInvert() {
  const value = document.getElementById("Invert").value;
  i = value;
  applyFilter();
}

function reset() {
  b = 1;
  c = 1;
  g = 0;
  s = 0;
  i = 0;

  applyFilter();
  document.getElementById("Brightness").value = "50";
  document.getElementById("Contrast").value = "50";
  document.getElementById("Sepia").value = "0";
  document.getElementById("Invert").value = "0";
  document.getElementById("Grayscale").value = "0";
}
