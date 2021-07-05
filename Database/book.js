const mongoose = require ("mongoose");

//creating a book schema
const BookSchema = mongoose.Schema({
        ISBN: {
                type:String,
                required: true,
                minLength:"8",
                maxLength:"10", 
        },
        title: {
                type:String,
                required: true,
                minLength:"8",
                maxLength:"10", 
        },
        pubDate: {
                type:String,
                required: true,
                minLength:"10",
                maxLength:"10", 
        },
        language: {
                type:String,
                required: true,
                minLength:"2",
                maxLength:"2", 
        },
        numPage: {
                type:Number,
                required: true, 
        },
        author: {
                type:[Number],
                required: true,
        },
        publications:{
                type:[Number],
                required: true, 
        }, 
        category:{
                type:[String],
                required: true, 
        },   
});

//Create a book model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;