function submit() {
  const fn = document.getElementById("fullName").value;
  const em = document.getElementById("email").value;
  const mb = document.getElementById("mobile").value;
  const dob = document.getElementById("dob").value;
  const ql = document.getElementById("qualification").value;
  const sr = document.getElementById("score").value;
  const cr = document.getElementById("course").value;
  let pb = [];
  document
    .querySelectorAll("input[name='batch']:checked")
    .forEach((element) => {
      pb.push(element.value);
    });
  const pt = document.querySelector("input[name='timing']:checked").value;
  const ad = document.getElementById("address").value;
  const ct = document.getElementById("city").value;
  const pn = document.getElementById("pin").value;

  console.log("Full Name: " + fn);
  console.log("Email: " + em);
  console.log("Mobile: " + mb);
  console.log("Date of Birth: " + dob);
  console.log("Qualification: " + ql);
  console.log("Score: " + sr);
  console.log("Course: " + cr);
  console.log("Preferred Batch: " + pb.join(", "));
  console.log("Preferred Timing: " + pt);
  console.log("Address: " + ad);
  console.log("City: " + ct);
  console.log("Pin Code: " + pn);
}

function clearFrom() {
  window.location.reload();
}
