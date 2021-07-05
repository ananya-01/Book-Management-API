//prefix: /publications

//Initializing Express Router
const Router = require("express").Router();

//Database Models
const PublicationModel = require("../../database/publications");


/*
Route          /publications
Description    Get all publications
Access         Public
Parameter      NONE
Methods        GET  
*/
Router.get("/",  async(req, res) => {
  try{
    const getAllPublications = await PublicationModel.find();
    return res.json({ publications: getAllPublications });
  }catch(error){
    return res.json({error: error.message});
  }
  });
  
  
  /*
  Route          /publications/id
  Description    Get all specific publication based on id
  Access         Public
  Parameter      id
  Methods        GET  
  */
  Router.get("/:id", async (req, res) => {
    try{
    const getSpecificPublication = await PublicationModel.findOne({
      id:req.params.id
    });
   
  
    if (!getSpecificPublication) {
      return res.json({
        error: `No Publication found for the id of ${req.params.id}`,
      });
    }
  
    return res.json({ publication: getSpecificPublication });
  }catch(error){
    return res.json({error: error.message});
  }
  });
  
  
  /*
  Route          /publications/book
  Description    Get all specific publications based on book
  Access         Public
  Parameter      isbn
  Methods        GET  
  */
  Router.get("/book/:isbn", async (req, res) => {
    try{
    const getSpecificPublication = await PublicationModel.findOne({
      books:req.params.isbn
    });
    
  
    if (!getSpecificPublication) {
      return res.json({
        error: `No Publications found for the book of ${req.params.isbn}`,
      });
    }
  
    return res.json({ publication : getSpecificPublication });
  }catch(error){
    return res.json({error: error.message});
  }
  });
  
  
  /*
  Route          /publications/add
  Description    add new publication
  Access         Public
  Parameter      None
  Methods        POST  
  */
  Router.post("/add", async (req,res) => {
    try{
    const {newPublication} = req.body;
  
    const addNewPublication = await PublicationModel.create(newPublication);
    return res.json({addNewPublication});
    }catch(error){
      return res.json({error: error.message});
    }
  });
  

  /*
  Route          /publication/update/name
  Description    update the publication name by id
  Access         Public
  Parameter      id
  Methods        PUT 
  */
  Router.put("/update/name/:id", async(req,res) => {
    try{
    const updatedPublication = await PublicationModel.findOneAndUpdate({
      id: req.params.id
    },
    {
      name: req.body.newPublicationBook
    },
    {
      new:true
    });
  
    return res.json({publications: updatedPublication});
  }catch(error){
    return res.json({error: error.message});
  }
  });
  
  
  /*
  Route          /book/update/publications
  Description    update/add books to publications
  Access         Public
  Parameter      isbn
  Methods        PUT 
  */
  Router.put("/book/update/:isbn",async (req, res) => {
    try{
    // update book database
    const updatedBook = await BookModel.findOneAndUpdate({
      ISBN : req.params.isbn
    },
    {
      $addToSet:{
        publications: req.body.newPublication
      }
    },
    {
      new: true
    }
    );
  
    // update publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate({
      id: req.body.newPublication
    },
    {
      $addToSet:{
        books: req.params.isbn
      }
    },
    {
      new: true
    }
    );
  
    return res.json({ books: updatedBook, publications: updatedPublication });
  }catch(error){
    return res.json({error: error.message});
  }
  });
  
  /*
  Route          /publication/delete
  Description    delete a publications
  Access         Public
  Parameter      id
  Methods        DELETE
  */
  Router.delete("/delete/:id",async(req,res) => {
    try{
    const updatedPublicationDatabase = await PublicationModel.findOneAndDelete(
      {
        id : req.params.id
      });
    return res.json({publications: updatedPublicationDatabase });
    }catch(error){
      return res.json({error: error.message});
    }
  });

  
  /*
  Route          /book/delete/publication
  Description    delete a book from publication
  Access         Public
  Parameter      isbn, publication id
  Methods        DELETE
  */
  Router.delete("/book/delete/:isbn/:publicationId", async(req, res) => {
    try{
    // update publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate(
      {
        id: parseInt(req.params.publicationsId),
      },
      {
        $pull: {
          books: req.params.isbn,
        },
      },
      { new: true }
    );
  
    // update book database
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $pull: {
          publications: parseInt(req.params.publicationsId),
        },
      },
      { new: true }
    );
  
    return res.json({
      books: updatedBook,
      publications: updatedPublication,
    });
  }catch(error){
    return res.json({error: error.message});
  }
  });

  
  module.exports = Router;
  