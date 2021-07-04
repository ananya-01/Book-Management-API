let books = [
    { 
        ISBN: "12345Book",
        title: "Getting started with MERN",
        pubDate: "2021-07-07",
        language:"en",
        numPage: 250,
        author: [1, 2],
        publications:[1], 
        category:["tech","programming","education"],   
    },
];

const author =[
    {
        id:"1",
        name:"Ananya",
        books:["12345Book","12345One"],
    },
    {
        id: "2",
        name:"Sai",
        books:["12345Book"],
    },
];

const publications =[
    {
        id: "1",
        name: "writex",
        books: ["12345Book"], 
    },
   
];

module.exports = {books,author,publications};