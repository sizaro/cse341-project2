const dotenv = require('dotenv').config();

const MongoClient = require('mongodb').MongoClient

let database;

const initDB = (callback) => {
    if(database){
        console.log("database is already initialized")
        return callback(null,  database)
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) =>{
        database = client;
        console.log("database succesfully initialized!!!")
        callback(null, database)
    })
    
   .catch((err) => {
   callback(err);
   })

    
}

const getDb = ()=> {
    if(!database){
        throw Error("Database not connected!!!")
    }
    return database
}


module.exports = {initDB, getDb}