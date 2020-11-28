// Holds and manages the connection to the database.
// This is passed into other components so they can use the database without caring too much about the overhead of connecting/disconnecting.
// May also perform queries or updates to it with functions, or just leave it to other components to do that. (Undecided)
const mongoose = require('mongoose');
const URI = 'mongodb://admin:bbbot123@mongo.bubble-bot.com:27017/admin';

const Stuff = mongoose.model('anything', {title: {type: String, require: false}});

class DatabaseServices {

    constructor() {
        //Connect to database
        console.log(URI);
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((result)=> {
            console.log('connection to db successful')
        }).catch((err) => {
            console.log('failed to connect to db')
        })


    }

    //which model to pull
    getModel(){

    }
    getDb() {
        //return this.db;
    }
}

module.exports = DatabaseServices;