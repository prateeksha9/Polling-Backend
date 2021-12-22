const mongoose = require("mongoose");
// const env = require("./enviorment");

mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.ab0jx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
//(`mongodb://localhost/polling_dev`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to DB");
});

module.exports = db;
