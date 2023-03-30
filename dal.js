const { MongoClient, ServerApiVersion } = require('mongodb');
// console.log(`process.env.MONGODB_URI: ${process.env.MONGODB_URI}`)
// const uri = process.env.MONGODB_URI;
const uri = "mongodb+srv://FullStack:li3YJhHrHHXph5bF@cluster0.nn2wcjd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// connect to mongo
let db            = null;
client.connect(err => {
    console.log("Connected successfully to db server");
    // connect to myproject database
    db = client.db('myproject');
});

function initConnect() {
    
}


// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
            // db.close();     
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );

    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db.collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });
    })
}


module.exports = { initConnect, create, findOne, find, update, all};