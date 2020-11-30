// Holds and manages the connection to the database.
// This is passed into other components so they can use the database without caring too much about the overhead of connecting/disconnecting.
// May also perform queries or updates to it with functions, or just leave it to other components to do that. (Undecided)
const URI = 'mongodb://admin:bbbot123@mongo.bubble-bot.com:27017/bbbot?authSource=admin';
const {MongoClient} = require('mongodb');

class DatabaseServices {

     constructor() {

    }
    //Choose which model we're saving to
    saveToTable(collection, data, callback){
        const client = new MongoClient(URI,{ useUnifiedTopology: true });
        client.connect()
            .then(r => {
                client.db('bbbot').collection(collection).insertMany(data)
                    .then(r => {
                        client.close().then(r => callback());
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    // Updates the items that match search_terms with data
    updateTable(collection, search_terms, data, callback) {
        const client = new MongoClient(URI,{ useUnifiedTopology: true });
        client.connect()
            .then(r => {
                client.db('bbbot').collection(collection).replaceOne(search_terms, data)
                    .then(r => {
                        client.close().then(r => callback());
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    //which model to pull
    getTable(collection, search_terms, callback) {
         let resultArray = [];
         MongoClient.connect(URI,{ useUnifiedTopology: true }, function (err, db){
             if (err) throw err;
             let dbo = db.db('bbbot');
             let cursor = dbo.collection(collection).find(search_terms);
             cursor.forEach(function (doc, err){
                 resultArray.push(doc);
             }, function (){
                 db.close();
                 callback(resultArray);
             })

         })
        return resultArray;
    }

    clearTable(collection, callback) {
        MongoClient.connect(URI,{ useUnifiedTopology: true }, function (err, db){
            if (err) throw err;
            let dbo = db.db('bbbot');
            dbo.collection(collection).remove(function (err, delOK){
                if (err) throw err;
                if (delOK)
                db.close();
                callback();
            });
        })
    }
}

module.exports = DatabaseServices;