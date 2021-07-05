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
  try{
    const getAllAuthor = await AuthorModel.find();
    return res.json({authors: getAllAuthor});
  }catch(error){
    return res.json({error: error.message});
  }
 
});


/*
Route          /author/id
Description    Get all specific author based on id
Access         Public
Parameter      id
Methods        GET  
*/
Router.get("/:id", async (req, res) => {
  try{
  const getSpecificAuthor = await AuthorModel.findOne({
    id: req.params.id
  });
  

  if (!getSpecificAuthor) {
    return res.json({
      error: `No Author found for the id of ${req.params.id}`,
    });
  }

  return res.json({ authors: getSpecificAuthor });
}catch(error){
  return res.json({error: error.message});
}
});


/*
Route          /author/book
Description    Get all author based on books
Access         Public
Parameter      isbn
Methods        GET  
*/
Router.get("/book/:isbn", async (req, res) => {
  try{
  const getSpecificAuthor = await AuthorModel.findOne({
    books: req.params.isbn
  });
 

  if (!getSpecificAuthor) {
    return res.json({
      error: `No Author found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthor });
}catch(error){
  return res.json({error: error.message});
}
});


/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
  try{
    const { newAuthor } = req.body;
    
    const addNewAuthor = await AuthorModel.create(newAuthor);
    return res.json({ addNewAuthor, message: "book was added" });

  }catch(error){
    return res.json({error : error.message});
  }
  });

  
  /*
Route          /author/update/name
Description    Update Author name by id
Access         Public
Parameter      id
Methods        PUT 
*/
Router.put("/update/name/:id",async (req,res) => {
  try{
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
  }catch(error){
    return res.json({error: error.message});
  }
  });

  /*
Route          /author/delete
Description    delete an author
Access         Public
Parameter      id
Methods        DELETE
*/
Router.delete("/delete/:id",async (req,res) => {
  try{
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
      {
        id : req.params.id
      });
    return res.json({author: updatedAuthorDatabase });
    }catch(error){
      return res.json({error: error.message});
    }
  });

  module.exports = Router;