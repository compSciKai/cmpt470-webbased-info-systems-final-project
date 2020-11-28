const DatabaseServices = require('./database');
const express = require('express');
const app = express();

const db = new DatabaseServices();

//save (name of table, array of JSON, callback)
db.saveToTable('test', [{age:5, gender:6}, {gender:7, age:7}, {hair:8, shoes:8}], function (){
    //callback for after saving to table
    console.log('doing stuff after saving to table');
})

//read  (name of table, search_criteria, callback) https://docs.mongodb.com/manual/reference/operator/query-comparison/ for full list of comparators in mongoDB
db.getTable('test', {age: {$gt: 4, $lt: 200}}, function (result){
    console.log(result);
});

//clear  (clears a table of saved content)
db.clearTable('test1', function(){
    console.log('doing stuff after clearing the table')
});

app.get('/', (req, res) => {
    res.send(x);
});

app.listen(8080);

