var username = document.getElementById("username");
var password = document.getElementById("password");
var remember_me = document.getElementById("Remember_Me");
var message = document.getElementById("message");

document.getElementById("form").addEventListener("onsubmit", function (){

    console.log(username.value);
    message.innerText = username.value;

});