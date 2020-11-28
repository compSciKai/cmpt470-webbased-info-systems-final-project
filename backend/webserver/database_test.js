const DatabaseServices = require('./database');
const express = require('express');
const app = express();

const db = new DatabaseServices();


app.get('/', (req, res) => {
    res.send('party party');
});

app.listen(8080);

