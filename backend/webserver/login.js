const express = require('express');
const app = express();

app.set('view-engine', 'ejs');

var username = document.getElementById("username");
var password = document.getElementById("password");
var remember_me = document.getElementById("Remember_Me");
var message = document.getElementById("message");
var form = document.getElementById("form");
form.onsubmit = function f(e){
    e.preventDefault();

}
