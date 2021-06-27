const express = require("express");

// Database
const database = require("./database");

// Initialization
const bookApi = express();

//configuration
bookApi.use(express.json());

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


/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
bookApi.post("/book/add", (req, res) => {
  const { newBook } = req.body;
  database.books.push(newBook);
  return res.json({ books: database.books });
});

/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
bookApi.post("/author/add", (req, res) => {
  const { newAuthor } = req.body;
  database.author.push(newAuthor);
  return res.json({ authors: database.author });
});

/*
Route          /publications/add
Description    add new publication
Access         Public
Parameter      None
Methods        POST  
*/
bookApi.post("/publications/add",(req,res) => {
  const {newPublication} = req.body;

  database.publications.push(newPublication);
  return res.json({publications : database.publications});
});

/*
Route          /book/update/title
Description    update book title
Access         Public
Parameter      isbn
Methods        PUT 
*/
bookApi.put("/book/update/title/:isbn",(req,res) => {
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn){
      book.title = req.body.newBookTitle;
      return;
    }
  });
  return res.json({books: database.books});
});

/*
Route          /book/update/author
Description    update/add new author for a book
Access         Public
Parameter      isbn
Methods        PUT 
*/
bookApi.put("/book/update/author/:isbn/:authorId", (req, res) => {
  // update book database

  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      return book.author.push(parseInt(req.params.authorId));
    }
  });

  // update author database

  database.author.forEach((author) => {
    if (author.id === parseInt(req.params.authorId))
      return author.books.push(req.params.isbn);
  });

  return res.json({ books: database.books, author: database.author });
});

/*
Route          /author/update/book
Description    Update Author name by id
Access         Public
Parameter      id
Methods        PUT 
*/

bookApi.put("/author/update/book/:id",(req,res) => {
  database.author.forEach((author) => {
    if(author.id === req.params.id){
      author.books = req.body.newAuthorBook;
      return;
    }
  });
  return res.json({author: database.author});
});


/*
Route          /publication/update/book
Description    update the publication name by id
Access         Public
Parameter      id
Methods        PUT 
*/
bookApi.put("/publication/update/book/:id",(req,res) => {
  database.publications.forEach((publications) => {
    if(publications.id === req.params.id){
      publications.books = req.body.newPublicationBook;
      return;
    }
  });
  return res.json({publications: database.publications});
});


/*
Route          /book/update/publications
Description    update/add books to publications
Access         Public
Parameter      isbn
Methods        PUT 
*/
bookApi.put("/book/update/publications/:isbn/:publicationsId", (req, res) => {
  // update book database

  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      return book.publications.push(parseInt(req.params.publicationsId));
    }
  });

  // update publications database

  database.publications.forEach((publications) => {
    if (publications.id === parseInt(req.params.publicationsId))
      return publications.books.push(req.params.isbn);
  });

  return res.json({ books: database.books, publications: database.publications});
});

bookApi.listen(3000, () => console.log("The server is running."));
