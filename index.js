require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Database
const database = require("./database/index");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publications");

// Initialization
const bookApi = express();

//configuration
bookApi.use(express.json());

//Database connection
mongoose.connect(
    process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)
.then(() => console.log("Connection is done."));

/*
Route          /
Description    Get all books
Access         Public
Parameter      None
Methods        GET  
*/
bookApi.get("/", async (req, res) => {
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
bookApi.get("/is/:isbn", async (req, res) => {

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
bookApi.get("/c/:category", async (req, res) => {
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
bookApi.get("/l/:language", async (req, res) => {
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
Route          /author
Description    Get all author
Access         Public
Parameter      None
Methods        GET  
*/
bookApi.get("/author",async (req,res)=>{
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
bookApi.get("/author/:id", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.findOne({
    id: req.params.id
  })
  

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
bookApi.get("/author/book/:isbn", async (req, res) => {
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
Route          /publications
Description    Get all publications
Access         Public
Parameter      NONE
Methods        GET  
*/
bookApi.get("/publications",  async(req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json({ publications: getAllPublications });
});


/*
Route          /publications/id
Description    Get all specific publication based on id
Access         Public
Parameter      id
Methods        GET  
*/
bookApi.get("/publications/:id", async (req, res) => {
  const getSpecificPublication = await PublicationModel.findOne({
    id:req.params.id
  })
 

  if (!getSpecificPublication) {
    return res.json({
      error: `No Publication found for the id of ${req.params.id}`,
    });
  }

  return res.json({ publication: getSpecificPublication });
});


/*
Route          /publications/book
Description    Get all specific publications based on book
Access         Public
Parameter      isbn
Methods        GET  
*/
bookApi.get("/publications/book/:isbn", async (req, res) => {
  const getSpecificPublication = await PublicationModel.findOne({
    books:req.params.isbn
  });
  

  if (!getSpecificPublication) {
    return res.json({
      error: `No Publications found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ publication : getSpecificPublication });
});


/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
bookApi.post("/book/add", async (req, res) => {
  const { newBook } = req.body;

  const addNewBook = BookModel.create(newBook);
  return res.json({ addNewBook });
});


/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
bookApi.post("/author/add", async (req, res) => {
  const { newAuthor } = req.body;
  
  const addNewAuthor = AuthorModel.create(newAuthor);
  return res.json({ addNewAuthor });
});


/*
Route          /publications/add
Description    add new publication
Access         Public
Parameter      None
Methods        POST  
*/
bookApi.post("/publications/add", async (req,res) => {
  const {newPublication} = req.body;

  const addNewPublication = PublicationModel.create(newPublication)
  return res.json({addNewPublication});
});


/*
Route          /book/update/title
Description    update book title
Access         Public
Parameter      isbn
Methods        PUT 
*/
bookApi.put("/book/update/title/:isbn", async(req,res) => {
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
bookApi.put("/book/update/author/:isbn", async (req, res) => {
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
Route          /author/update/name
Description    Update Author name by id
Access         Public
Parameter      id
Methods        PUT 
*/
bookApi.put("/author/update/name/:id",async (req,res) => {
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
Route          /publication/update/name
Description    update the publication name by id
Access         Public
Parameter      id
Methods        PUT 
*/
bookApi.put("/publication/update/name/:id", async(req,res) => {
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
});


/*
Route          /book/update/publications
Description    update/add books to publications
Access         Public
Parameter      isbn
Methods        PUT 
*/
bookApi.put("/book/update/publications/:isbn",async (req, res) => {
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
});


/*
Route          /book/delete
Description    delete a book
Access         Public
Parameter      isbn
Methods        DELETE
*/
bookApi.delete("/book/delete/:isbn",async(req,res) => {
  const updatedBookDatabase = await BookModel.findOneAndDelete(
    {
      ISBN : req.params.isbn
    });
 
  return res.json({books :updatedBookDatabase });

});


/*
Route          /author/delete
Description    delete an author
Access         Public
Parameter      id
Methods        DELETE
*/
bookApi.delete("/author/delete/:id",async (req,res) => {
  const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
    {
      id : req.params.id
    });
  return res.json({author: updatedAuthorDatabase });

});


/*
Route          /publication/delete
Description    delete a publications
Access         Public
Parameter      id
Methods        DELETE
*/
bookApi.delete("/publication/delete/:id",async(req,res) => {
  const updatedPublicationDatabase = await PublicationModel.findOneAndDelete(
    {
      id : req.params.id
    });
  return res.json({publications: updatedPublicationDatabase });

});


/*
Route          /book/delete/author
Description    delete an author from a book
Access         Public
Parameter      isbn
Methods        DELETE
*/
bookApi.delete("/delete/author/:isbn/:authorId", async (req, res) => {
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

/*
Route          /book/delete/publication
Description    delete a book from publication
Access         Public
Parameter      isbn, publication id
Methods        DELETE
*/
bookApi.delete("/book/delete/publication/:isbn/:publicationId", async(req, res) => {
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
});


bookApi.listen(3000, () => console.log("The server is running."));
