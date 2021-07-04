const mongoose = require("mongoose");

//creating a Author schema
const AuthorSchema = mongoose.Schema({
    id:String,
        name:String,
        books:[String],  
});

//Create a Author model
const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;