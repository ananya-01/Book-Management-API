const mongoose = require("mongoose");

//creating a Author schema
const AuthorSchema = mongoose.Schema({
    id:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: true,
        maxLength:"10", 
    },
    books:{
        type:[String],
        required: true,  
    }, 

});

//Create a Author model
const AuthorModel = mongoose.model( "author" ,AuthorSchema);

module.exports = AuthorModel;