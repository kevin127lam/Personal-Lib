// Put your name and ID here 

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(
  path.resolve(__dirname, "public")
));

// Insert code here
let books = {};
let nextid = 0;

function returnBooks(res) {
  let bookList = [];
  for (b in books) {
    let book = books[b];
    bookList.push[book];
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
  const btype = req.query.btype;
  const id = "book" + ++nextid;
  const book = new Book(id, title, auth, genre, publ, year, btype)
  books[id] = book;
  returnBooks(res);
  //res.json({ status: 'success', message: 'Book added successfully', books });
});

app.get('/list', (req, res) => {
  // res.json(books);
  const bookList = Object.values(books);
  res.json(bookList);
});

class Book {
  constructor(id, title, author, genre, publisher, year, btype) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.publisher = publisher;
    this.year = year;
    this.btype = btype;
  }
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
