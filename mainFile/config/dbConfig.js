const mongoose = require("mongoose");
let MONGO_URL = "mongodb://127.0.0.1:27017/Triple_T";

mongoose.connect(MONGO_URL); // established the connection 

// creating the instance of the database connection
const db = mongoose.connection;

// listing for "success" or "connected" event
db.on("connected", () => {
    console.log("DB connection successful!!!", );
});

// listing for "error" event
db.on("error", (err) => {
    console.log("DB connection failed!!!", err);
})

module.exports = db;