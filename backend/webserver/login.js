const express = require('express');
const ejs = require('ejs');
const path = require('path')
const app = express();

app.listen(3000);
app.set('views', path.join(__dirname, '..', '..', 'frontend', 'pages'));

app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', ((req, res) => {

}))
