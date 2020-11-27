// Holds and manages the connection to the database.
// This is passed into other components so they can use the database without caring too much about the overhead of connecting/disconnecting.
// May also perform queries or updates to it with functions, or just leave it to other components to do that. (Undecided)
class DatabaseServices {
    constructor() {
        //Connect to database and store a variable to it
        //this.db = ;
    }

    getDb() {
        //return this.db;
    }
}

module.exports = DatabaseServices;