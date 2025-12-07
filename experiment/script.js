function search() {
  const state = document.getElementById("State").value.trim().toLowerCase();
    
  if(!state){
    alert("State Empty")
    return
  }
  
  const flag = document.createElement("i");
  flag.classList.add("bi", "bi-flag-fill", "text-danger", "fs-3");
  flag.style.position = "absolute";

  if (state === "delhi") {
    flag.style.top = "345px";
    flag.style.left = "360px";
  }
  if(state === "madhya pradesh" || state === "mp"){
    flag.style.top = "545px";
    flag.style.left = "360px";
  }
  if(state === "ladakh"){
    flag.style.top = "100px";
    flag.style.left = "350px";
  }
  if(state === "jammu & kashmir"){
    flag.style.top = "150px";
    flag.style.left = "300px";
  }
  if(state === "himachal pradesh"){
    flag.style.top = "230px";
    flag.style.left = "370px";
  }
  if(state === "punjab"){
    flag.style.top = "250px";
    flag.style.left = "300px";
  }
  if(state === "uttarakhand"){
    flag.style.top = "290px";
    flag.style.left = "420px";
  }
  if(state === "haryana"){
    flag.style.top = "330px";
    flag.style.left = "330px";
  }
  if(state === "up" || state === "uttar pradesh"){
    flag.style.top = "400px";   
    flag.style.left = "450px";
  }
  if(state === "rajasthan"){
    flag.style.top = "400px";   
    flag.style.left = "250px";
  }
  if(state === "bihar"){
    flag.style.top = "480px";   
    flag.style.left = "650px";
  }
  if(state === "jharkhand"){
    flag.style.top = "550px";   
    flag.style.left = "620px";
  }
  if(state === "west bengal"){
    flag.style.top = "560px";   
    flag.style.left = "700px";
  }
  if(state === "west bengal"){
    flag.style.top = "560px";   
    flag.style.left = "700px";
  }
  if(state === "chattisgarh"){
    flag.style.top = "640px";   
    flag.style.left = "500px";
  }




  document.getElementById("Map").appendChild(flag);
  document.getElementById("State").value=""
}
