const DatabaseServices = require('./database');
const express = require('express');
const app = express();

const db = new DatabaseServices();

//save test
db.saveToTable('test', [{one:5, two:6}, {one:7, two:7}, {one:8, two:8}], function (){
    //callback for after saving to table
    console.log('doing stuff after saving to table');
})

//read test
db.getTable('test', {one: 7}, function (result){
    console.log(result);
});

//read test 2 (if this can happen asynchronously)
let x = db.getTable('test'); //then do stuff with x


//clear test (clears a table of saved content)
db.clearTable('test', function(){
    console.log('doing stuff after clearing the table')
});

app.get('/', (req, res) => {
    res.send(x);
});

app.listen(8080);

