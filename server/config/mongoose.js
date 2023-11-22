const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/mess-management');

const db = mongoose.connection;

db.on("error",console.error.bind(console,'Error Connection To MongoDB'));

db.once('open',function(){
    console.log('Connected to database :: MongoDB');
});

module.exports = db;