const mongoose = require("mongoose");

//creating a Publications schema
const PublicationSchema = mongoose.Schema({
        id:String,
        name:String,
        books:[String],  
});

//Create a Publications model
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;