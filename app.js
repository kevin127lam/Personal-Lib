// Put your name and ID here 

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(
  path.resolve(__dirname, "public")
));

// Insert code here
let books = {};
let bookNum = 0;

function returnBooks(res) {
  let bookList = [];
  for (b in books) {
    let book = books[b];
    bookList.push[b];
  }
  const ret = JSON.stringify(bookList);
  res.end(ret);
}

app.get("/load", (req, res) => {
  returnBooks(res);
});

app.get("/add", (req, res) => {
  const title = req.query.title;
  const auth = req.query.auth;
  const genre = req.query.genre;
  const publ = req.query.publ;
  const year = req.query.year;
  const type = req.query.type;
  const book = new Book(title, auth, genre, publ, year, type)
  books[bookNum++] = book;
  returnBooks(res);
});

class Book {
  constructor(title, author, genre, publisher, year, type) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.publisher = publisher;
    this.year = year;
    this.type = type;
  }
}

app.listen(3000);

