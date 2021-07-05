//prefix: /book

//Initializing Express Router
const Router = require("express").Router();

//Database Models
const BookModel = require("../../database/book");

/*
Route          /
Description    Get all books
Access         Public
Parameter      None
Methods        GET  
*/
Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
  });
  
  
  /*
  Route          /is
  Description    Get specific books based on ISBN
  Access         Public
  Parameter      None
  Methods        GET  
  */
  Router.get("/is/:isbn", async (req, res) => {
  
    const getSpecificBook = await BookModel.findOne({
      ISBN: req.params.isbn
    });
    
  
    if (!getSpecificBook) {
      return res.json({
        error: `No book found for the ISBN of ${req.params.isbn}`,
      });
    }
  
    return res.json({ getSpecificBook });
  });
  
  
  /*
  Route          /c
  Description    Get specific books based on category
  Access         Public
  Parameter      Category
  Methods        GET  
  */
  Router.get("/c/:category", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({
      category: req.params.category
    });
   
  
    if (!getSpecificBook) {
      return res.json({
        error: `No book found for the category of ${req.params.category}`,
      });
    }
  
    return res.json({ getSpecificBook });
  });
  
  
  /*
  Route          /l
  Description    Get specific books based on language
  Access         Public
  Parameter      language
  Methods        GET  
  */
  Router.get("/l/:language", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({
      language: req.params.language
    });
  
  
    if (!getSpecificBook) {
      return res.json({
        error: `No book found for the language of ${req.params.language}`,
      });
    }
  
    return res.json({ book: getSpecificBook });
  });


  /*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
    const { newBook } = req.body;
  
    const addNewBook = BookModel.create(newBook);
    return res.json({ addNewBook });
  });

  
  
/*
Route          /book/update/title
Description    update book title
Access         Public
Parameter      isbn
Methods        PUT 
*/
Router.put("/update/title/:isbn", async(req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate({
      ISBN : req.params.isbn,
    },
    {
      title: req.body.newBookTitle, 
    },
    {
      new: true,
    }
    );
    return res.json({books: updatedBook});
  });
  
  
  /*
  Route          /book/update/author
  Description    update/add new author for a book
  Access         Public
  Parameter      isbn
  Methods        PUT 
  */
  Router.put("/update/author/:isbn", async (req, res) => {
    // update the book database
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $addToSet: {
          authors: req.body.newAuthor,
        },
      },
      {
        new: true,
      }
    );
    // update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: req.body.newAuthor,
      },
      {
        $addToSet: {
          books: req.params.isbn,
        },
      },
      {
        new: true 
      }
    );
  
    return res.json({
      books: updatedBook,
      authors: updatedAuthor,
    });
  });

  /*
Route          /book/delete
Description    delete a book
Access         Public
Parameter      isbn
Methods        DELETE
*/
Router.delete("/delete/:isbn",async(req,res) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete(
      {
        ISBN : req.params.isbn
      });
   
    return res.json({books :updatedBookDatabase });
  
  });


  /*
Route          /book/delete/author
Description    delete an author from a book
Access         Public
Parameter      isbn
Methods        DELETE
*/
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
    // update the book database
  
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $pull: {
          author: parseInt(req.params.authorId),
        },
      },
      { new: true }
    );
  
    // update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: parseInt(req.params.authorId),
      },
      {
        $pull: {
          books: req.params.isbn,
        },
      },
      { new: true }
    );
    
    return res.json({
      books: updatedBook,
      author: updatedAuthor,
    });
  });

  module.exports = Router;