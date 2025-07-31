//js will handle local storage and dynamic css changes like light mode/dark mode
//and resizing of new post form on focus/blur
function openNav() {
  document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}
let loggedInUser =undefined;

function newPost() {
   
    loggedInUser=localStorage.getItem("UserPost");
    localStorage.removeItem("UserPost");
    if(loggedInUser != undefined){
        document.getElementById("newPoster").innerHTML=loggedInUser+" says...";
        document.getElementById("welcomeMessage").style.visibility = "visible";
        document.getElementById("welcomeMessage").innerHTML= "Welcome "+loggedInUser+"!";
        document.getElementById("loginMessage").style.visibility = "hidden";
        document.getElementById("newUserPost").style.visibility = "visible";
    }
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
        loggedInUser=localStorage.getItem("loggedUser");
        console.log(loggedInUser);
        
    }
}

function logout(){
    localStorage.removeItem("loggedUser");
    location.reload();
}

function passUser(){
    localStorage.setItem("UserPost", loggedInUser);
    location.href = "newpost.html";
}

function post(){
    event.preventDefault();
    localStorage.setItem("UserPost",loggedInUser);
    localStorage.setItem("postContent",document.getElementById("postContent").value);
    location.href = "user.html";
}

function loadHistory(){
    loggedInUser=localStorage.getItem("UserPost");
    localStorage.removeItem("UserPost");
    let postContent = localStorage.getItem("postContent");
    localStorage.removeItem("postContent");
    savePost(postContent);
}

function savePost(string){
    const br = document.createElement('br');
    const container = document.createElement('div');
    container.setAttribute('class','oldPost');
    container.setAttribute('background-color', 'var(--lightModeAccents)');
    container.setAttribute('border-radius', '8px');
    const postHeader = document.createElement('h1');
    postHeader.setAttribute('color','var(--darkModeColour)')
    postHeader.innerHTML= (document.getElementsByClassName('oldPost').length+1) + ') ' +loggedInUser+' says...';
    postHeader.appendChild(br);
    const postBody = document.createElement('p');
    postBody.setAttribute('color', 'var(--darkModeColour)');
    postBody.innerHTML= string;
    container.appendChild(postHeader);
    container.appendChild(postBody);
    document.body.appendChild(container);
}