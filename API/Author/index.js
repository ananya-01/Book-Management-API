//prefix: /author

//Initializing Express Router
const Router = require("express").Router();

//Database Models
const AuthorModel = require("../../database/author");


/*
Route          /author
Description    Get all author
Access         Public
Parameter      None
Methods        GET  
*/
Router.get("/",async (req,res)=>{
    const getAllAuthor = await AuthorModel.find();
    return res.json({authors: getAllAuthor});
});


/*
Route          /author/id
Description    Get all specific author based on id
Access         Public
Parameter      id
Methods        GET  
*/
Router.get("/:id", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.findOne({
    id: req.params.id
  });
  

  if (!getSpecificAuthor) {
    return res.json({
      error: `No Author found for the id of ${req.params.id}`,
    });
  }

  return res.json({ authors: getSpecificAuthor });
});


/*
Route          /author/book
Description    Get all author based on books
Access         Public
Parameter      isbn
Methods        GET  
*/
Router.get("/book/:isbn", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.findOne({
    books: req.params.isbn
  });
 

  if (!getSpecificAuthor) {
    return res.json({
      error: `No Author found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthor });
});


/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
    const { newAuthor } = req.body;
    
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({ addNewAuthor });
  });

  
  /*
Route          /author/update/name
Description    Update Author name by id
Access         Public
Parameter      id
Methods        PUT 
*/
Router.put("/update/name/:id",async (req,res) => {
    const updatedAuthor = await AuthorModel.findOneAndUpdate({
      id: req.params.id
    },
    {
      name: req.body.newAuthorBook
    },
    {
      new:true
    });
    
    return res.json({author: updatedAuthor});
  });

  /*
Route          /author/delete
Description    delete an author
Access         Public
Parameter      id
Methods        DELETE
*/
Router.delete("/delete/:id",async (req,res) => {
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
      {
        id : req.params.id
      });
    return res.json({author: updatedAuthorDatabase });
  
  });

  module.exports = Router;