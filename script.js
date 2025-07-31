//js will handle local storage and dynamic css changes like light mode/dark mode
//and resizing of new post form on focus/blur
let postArray = [];

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
        location.href ="index.html";
    }
}

function checkUser(){
    if(localStorage.getItem("loggedUser")){
        document.getElementById("login").style.visibility = "hidden";
        document.getElementById("welcomeMessage").style.visibility = "visible";
        document.getElementById("welcomeMessage").innerHTML= "Welcome "+localStorage.getItem("loggedUser")+"!";
        document.getElementById("logout").outerHTML =' <input type="submit" id="logout" value="Log Out" onclick="logout()"> ';
        loggedInUser=localStorage.getItem("loggedUser");
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

function read(input){
    if(input.files && input.files[0]){
        var reader = new FileReader();

        reader.onload = (e) => {
            localStorage.setItem('postImg', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    
    };
}


function post(){
    event.preventDefault();
    localStorage.setItem("UserPost",loggedInUser);
    localStorage.setItem("postTitle",document.getElementById("postTitle").value);
    localStorage.setItem("postContent",document.getElementById("postContent").value);
    if(document.getElementById("postImg").value !=null){

}
    location.href = "user.html";
}

function loadHistory(){
    loggedInUser=localStorage.getItem("UserPost");
    localStorage.removeItem("UserPost");
    let postName = localStorage.getItem("postTitle");
    localStorage.removeItem("postTitle");
    let postContent = localStorage.getItem("postContent");
    localStorage.removeItem("postContent");
    let postImg;
        
    if(localStorage.getItem("postImg")!=undefined){
    postImg = localStorage.getItem("postImg");
    localStorage.removeItem("postImg");
    postArray[postArray.length] = {
        loggedUser : loggedInUser,
        postN : postName,
        postC : postContent,
        postI : postImg
    };
    console.log(postArray);
    
    }else{
        postArray[postArray.length] = {
        loggedUser : loggedInUser,
        postN : postName,
        postC : postContent
        }
        console.log(postArray);
        
    }
    for(let i =0;i<postArray.length;){
        buildPost(i);
        i++;
    }
    
}

function buildPost(i){
    const post = postArray[i];

    const br = document.createElement('br');
    const container = document.createElement('div');
    container.setAttribute('class','oldPost');
    container.setAttribute('background-color', 'var(--lightModeAccents)');
    container.setAttribute('border-radius', '8px');
    container.setAttribute('width','50%');
    const postHeader = document.createElement('h1');
    postHeader.setAttribute('color','var(--darkModeColour)')
    postHeader.innerHTML= (document.getElementsByClassName('oldPost').length+1) + ') ' +post.loggedUser+' says...';
    postHeader.appendChild(br);
    const postName = document.createElement('h2');
    postName.setAttribute('color', 'var(--darkModeColour)');
    postName.innerHTML=post.postN;
    postName.appendChild(br);
    const postBody = document.createElement('p');
    postBody.setAttribute('color', 'var(--darkModeColour)');
    postBody.innerHTML= post.postC;
    container.appendChild(postHeader);
    container.appendChild(postName);
    container.appendChild(postBody);
    if(post.postI!=undefined){
        const postImage = document.createElement('img');
        postImage.setAttribute('src',post.postI);
        postImage.appendChild(br);
        container.appendChild(postImage);
    }
    document.body.appendChild(container);
}

