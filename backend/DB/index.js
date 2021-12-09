const mongoose = require('mongoose');
const dbConnection = process.env.DB_URL;

//creating connection to users db

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(dbConnection, options)
    .then(() => {
        console.log(`mongoDB connected: ${mongoose.connection.host}`)
    })
    .catch(err => {
        console.error(`connection error, ${err.message}`);
    })
const db = mongoose.connection;
module.exports = db;