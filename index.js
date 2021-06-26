const express = require("express");

// Database
const database = require("./database");

// Initialization
const bookApi = express();

/*
Route          /
Description    Get all books
Access         Public
Parameter      None
Methods        GET  
*/

bookApi.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
Route          /is
Description    Get specific books based on ISBN
Access         Public
Parameter      None
Methods        GET  
*/

bookApi.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route          /c
Description    Get specific books based on category
Access         Public
Parameter      Category
Methods        GET  
*/

bookApi.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route          /l
Description    Get specific books based on language
Access         Public
Parameter      language
Methods        GET  
*/

bookApi.get("/l/:language", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.language.includes(req.params.language)
  );

  if (getSpecificBook.length === 0) {
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

bookApi.get("/author",(req,res)=>{
    return res.json({authors: database.author});
});

/*
Route          /author/id
Description    Get all specific author based on id
Access         Public
Parameter      id
Methods        GET  
*/
 
bookApi.get("/author/:id", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.id.includes(req.params.id)
  );

  if (getSpecificAuthor.length === 0) {
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

bookApi.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor.length === 0) {
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
 
bookApi.get("/publications", (req, res) => {
  return res.json({ publications: database.publications });
});

/*
Route          /publications/id
Description    Get all specific publication based on id
Access         Public
Parameter      id
Methods        GET  
*/
bookApi.get("/publications/:id", (req, res) => {
  const getSpecificPublication = database.publications.filter((publications) =>
    publications.id.includes(req.params.id)
  );

  if (getSpecificPublication.length === 0) {
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

bookApi.get("/publications/book/:isbn", (req, res) => {
  const getSpecificPublication = database.publications.filter((publications) =>
    publications.books.includes(req.params.isbn)
  );

  if (getSpecificPublication.length === 0) {
    return res.json({
      error: `No Publications found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ publication : getSpecificPublication });
});

bookApi.listen(3000, () => console.log("The server is running."));
