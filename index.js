require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

//Initializing Microservices Routes
const Books = require("./API/Books");
const Author = require("./API/Author");
const Publications = require("./API/Publications");

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

//Microservices prefix
bookApi.use("/book", Books);
bookApi.use("/author", Author);
bookApi.use("/publications", Publications);


bookApi.listen(3000, () => console.log("The server is running."));
