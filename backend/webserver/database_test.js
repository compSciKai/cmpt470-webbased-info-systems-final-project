//import the class and create an instance
const DatabaseServices = require('./database');
const db = new DatabaseServices();

//save (name of table, array of JSON, callback), if no table is found it'll create one under that name
db.saveToTable('test', [{age:5, gender:6}, {gender:7, age:7}, {hair:8, shoes:8}], function (){
    //do stuff after saving to table
})

//read  (name of table, search_criteria, callback) https://docs.mongodb.com/manual/reference/operator/query-comparison/ for full list of comparators in mongoDB
db.getTable('test', {age: {$gt: 4, $lt: 200}}, function (result){
    //do stuff with the result, set to a variable if no need for callback
});

//clear  (name of table, callback) clears a table of all content
db.clearTable('test1', function(){
    //do stuff after clearing the table
});

//leave callback option blank if not needed

