const mongoose = require("mongoose");

//creating a Publications schema
const PublicationSchema = mongoose.Schema({
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

//Create a Publications model
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;