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
    flag.title = "State: Delhi \nCapital: New Delhi";
  }
  if(state === "madhya pradesh" || state === "mp"){
    flag.style.top = "545px";
    flag.style.left = "360px";
    flag.title = "State: Madhya Pradesh \nCapital: Bhopal";
  }
  if(state === "ladakh"){
    flag.style.top = "100px";
    flag.style.left = "350px";
    flag.title = "State: Ladakh \nCapital: Leh";
  }
  if(state === "jammu & kashmir"){
    flag.style.top = "150px";
    flag.style.left = "300px";
    flag.title = "State: Jammu & Kashmir \nCapital: Srinagar";
  }
  if(state === "himachal pradesh"){
    flag.style.top = "230px";
    flag.style.left = "370px";
    flag.title = "State: Himachal Pradesh \nCapital: Shimla";
  }
  if(state === "punjab"){
    flag.style.top = "250px";
    flag.style.left = "300px";
    flag.title = "State: Punjab \nCapital: Chandigarh";
  }
  if(state === "uttarakhand"){
    flag.style.top = "290px";
    flag.style.left = "420px";
    flag.title = "State: Uttarakhand \nCapital: Dehradun";
  }
  if(state === "haryana"){
    flag.style.top = "330px";
    flag.style.left = "330px";
    flag.title = "State: Haryana \nCapital: Chandigarh";
  }
  if(state === "up" || state === "uttar pradesh"){
    flag.style.top = "400px";   
    flag.style.left = "450px";
    flag.title = "State: Uttar Pradesh \nCapital: Lucknow";
  }
  if(state === "rajasthan"){
    flag.style.top = "400px";   
    flag.style.left = "250px";
    flag.title = "State: Rajasthan \nCapital: Jaipur";
  }
  if(state === "bihar"){
    flag.style.top = "480px";   
    flag.style.left = "650px";
    flag.title = "State: Bihar \nCapital: Patna";
  }
  if(state === "jharkhand"){
    flag.style.top = "550px";   
    flag.style.left = "620px";
    flag.title = "State: Jharkhand \nCapital: Ranchi";
  }
  if(state === "west bengal"){
    flag.style.top = "560px";   
    flag.style.left = "700px";
    flag.title = "State: West Bengal \nCapital: Kolkata";
  }
  if(state === "west bengal"){
    flag.style.top = "560px";   
    flag.style.left = "700px";
    flag.title = "State: West Bengal \nCapital: Kolkata";
  }
  if(state === "chhattisgarh"){
    flag.style.top = "640px";   
    flag.style.left = "500px";
    flag.title = "State: Chhattisgarh \nCapital: Raipur";
  }
  if(state === "maharashtra"){
    flag.style.top = "700px";   
    flag.style.left = "350px";
    flag.title = "State: Maharashtra \nCapital: Mumbai";
  }

localStorage.setItem()
localStorage.getItem()
localStorage.removeItem()



JSON.parse()
JSON.stringify()

  document.getElementById("Map").appendChild(flag);
  document.getElementById("State").value=""
}
