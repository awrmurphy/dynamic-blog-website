//js will handle local storage and dynamic css changes like light mode/dark mode
//and resizing of new post form on focus/blur
let postArray = [];
let postHistory;

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

function passUserNew(){
    localStorage.setItem("UserPost", loggedInUser);
    location.href = "newpost.html";
}
function passUserHistory(){
    localStorage.setItem("UserPost", loggedInUser);
    location.href = "user.html";
}
function passUserHome(){
    localStorage.setItem("UserPost", loggedInUser);
    location.href = "index.html";
}

function read(input){
    if(input.files && input.files[0]){
        var reader = new FileReader();

        reader.onload = (e) => {
            try{
            localStorage.setItem('postImg', e.target.result);
            }catch(e){
                if(e.name === 'QuotaExceededError'){
                    alert("This file is too large, try a smaller one.");
                }else{
                    throw e;
                }
            }
        };
        reader.readAsDataURL(input.files[0]);
    
    };
}


function post(){
    event.preventDefault();
    
    postArray=JSON.parse(localStorage.getItem("posts"));
    if(postArray==null||postArray==undefined){
        postArray=[];
    }
    if(localStorage.getItem('postImg')){
    postArray.push({
    loggedUser : loggedInUser,
    postN : document.getElementById("postTitle").value,
    postC : document.getElementById("postContent").value,
    postI : localStorage.getItem('postImg')
    });
    localStorage.removeItem('postImg');
   }else{
    postArray.push({
    loggedUser : loggedInUser,
    postN : document.getElementById("postTitle").value,
    postC : document.getElementById("postContent").value,
    postI : undefined
        });
    }
    postHistory = JSON.stringify(postArray);
    localStorage.setItem("posts",postHistory);
    localStorage.setItem("UserPost",loggedInUser);
    location.href = "user.html";
}

function loadHistory(){
    loggedInUser=localStorage.getItem("UserPost");
    
    postArray =JSON.parse(localStorage.getItem("posts"));

    for(let i =postArray.length-1;i>=0;){
        buildPost(i);
        i--;
    }
    postHistory = JSON.stringify(postArray);
    
    localStorage.setItem("posts",postHistory);
}

function buildPost(i){
    const post = postArray[i];
    
    const br = document.createElement('br');
    const container = document.createElement('div');
    container.setAttribute('id',`container:${postArray.length-i}`)
    container.setAttribute('class','oldPost');
    container.setAttribute('background-color', 'var(--lightModeAccents)');
    container.setAttribute('border-radius', '8px');
    container.setAttribute('width','50%');
    const postNumber = document.createElement('h1');
    postNumber.setAttribute('name','postNumber');
    postNumber.setAttribute('color','var(--darkModeColour');
    postNumber.innerHTML= (postArray.length-i);
    const postHeader = document.createElement('h1');
    postHeader.setAttribute('color','var(--darkModeColour)')
    postHeader.setAttribute('id',`postHeader: ${postArray.length-i}`);
    postHeader.innerHTML=') ' +post.loggedUser+' says...';
    const postName = document.createElement('h2');
    postName.setAttribute('color', 'var(--darkModeColour)');
    postName.setAttribute('id',`postName: ${postArray.length-i}`);
    postName.innerHTML=post.postN;
    postName.appendChild(br);
    const postBody = document.createElement('p');
    postBody.setAttribute('color', 'var(--darkModeColour)');
    postBody.setAttribute('id',`postBody: ${postArray.length-i}`);
    postBody.innerHTML= post.postC;
    container.appendChild(postNumber);
    container.appendChild(postHeader);
    container.appendChild(postName);
    container.appendChild(postBody);
    if(post.postI!=undefined){
        const postImage = document.createElement('img');
        postImage.setAttribute('src',post.postI);
        postImage.setAttribute('id',`postImage: ${postArray.length-i}`);
        container.appendChild(postImage);
        container.appendChild(br);
        
    }
    const edit = document.createElement('button');
    if(postArray.length==1){
        edit.setAttribute('onclick','edit(0)');
    }
    else{
    edit.setAttribute('onclick','edit(this.id)');
    }
    edit.setAttribute('id',postArray.length-i);
    edit.innerHTML='Edit Post';
    container.appendChild(edit);
    const del = document.createElement('button');
    del.setAttribute('onclick','del(this.id)');
    del.setAttribute('id',postArray.length-i)
    del.innerHTML='Delete Post';
    container.appendChild(del);
    document.body.appendChild(container);
}

function edit(i){

    document.getElementById(`postName: ${i}`).outerHTML=`<input type="text" placeholder="Post Title" id="postName: ${i}" minlength="1" maxlength="50" required>`;
    document.getElementById(`postBody: ${i}`).outerHTML=`<textarea id="postBody: ${i}" minlength="1" maxlength="200" cols="25" rows="4" required></textarea>`;
    if(document.getElementById(`postImage: ${i}`)){
    document.getElementById(`postImage: ${i}`).outerHTML=`<input type="file" id="postImage: ${i}" name="filename" accept="image/*" onchange="read(this)"><br>`;
    }
    document.getElementById(i).outerHTML=`<button id=${i} onclick="editPost(this.id)">Save</button>`
}

function editPost(i){
    var thisPost = postArray[i];
    
    thisPost.postN = document.getElementById(`postName: ${i}`).value;
    thisPost.postC = document.getElementById(`postBody: ${i}`).value;
    if(document.getElementById(`postImage: ${i}`)){
        thisPost.postI = localStorage.getItem('postImg');
    }
    postArray[i]=thisPost;
    postHistory = JSON.stringify(postArray);
    localStorage.setItem('posts', postHistory);
    document.getElementById(`postName: ${i}`).outerHTML=`<h2 color="var(--darkModeColour)" id='postName: ${i}'></h2>`;
    document.getElementById(`postName: ${i}`).innerHTML=thisPost.postN
    document.getElementById(`postBody: ${i}`).outerHTML=`<p color="var(--darkModeColour)" id="postBody: ${i}"></p>`;
    document.getElementById(`postBody: ${i}`).innerHTML=thisPost.postC
    if(document.getElementById(`postImage: ${i}`)){
        document.getElementById(`postImage: ${i}`).outerHTML=`<img id='postImage: ${i}'></img>`;
        document.getElementById(`postImage: ${i}`).setAttribute('src',thisPost.postI);
    }

}

function del(i){
    console.log(i);
    if(postArray.length==1){
        postArray.splice(0,1);
    }else{
        postArray.splice(i,1);
    }
postHistory = JSON.stringify(postArray);
localStorage.setItem('posts', postHistory);
document.querySelectorAll(".oldPost").forEach(el => el.remove());
loadHistory();


}

