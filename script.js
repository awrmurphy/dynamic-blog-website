//js will handle local storage and dynamic css changes like light mode/dark mode
//and resizing of new post form on focus/blur
function openNav() {
  document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}
var loggedInUser;

function newPost() {
    
}

function regUser(){
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    if(!localStorage.getItem(user)){
        localStorage.setItem(user,user);
        localStorage.setItem(userReg,(localStorage.getItem(userReg+1)));
        localStorage.setItem(user+"pass",pass)
    }else{
        alert("This username is in use!");
    }
}

function login(){
    
    loggedInUser = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    if(loggedInUser == localStorage.getItem(loggedInUser) && pass == localStorage.getItem(loggedInUser+"pass")){
        localStorage.setItem("loggedUser",loggedInUser);
        
    }
}

function checkUser(){
    if(localStorage.getItem("loggedUser")){
        document.getElementById("login").style.visibility = "hidden";
        document.getElementById("welcomeMessage").style.visibility = "visible";
        document.getElementById("welcomeMessage").innerHTML= "Welcome "+localStorage.getItem("loggedUser")+"!";
        document.getElementById("logout").outerHTML =' <input type="submit" id="logout" value="Log Out" onclick="logout()"> ';
    }
}

function logout(){
    localStorage.removeItem("loggedUser");
    location.reload();
}