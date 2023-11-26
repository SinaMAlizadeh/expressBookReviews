const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios").default;

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  let allBooks = new Promise((resolve, reject) => {
    resolve(JSON.stringify(books, null, 4));
  });
  allBooks.then((data) => res.send(data));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  // const isbn = req.params.isbn;
  // const book = books[isbn];
  // if (book) res.send(books[isbn]);
  // else {
  //   return res.status(404).json({ message: "Book not found" });
  // }
  let getBookByIsbn = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) resolve(books[isbn]);
    else {
      reject({ message: "Book not found" });
    }
  });
  getBookByIsbn
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(404).json(error);
    });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  // const book = Object.values(books).find(
  //   ({ author }) => author === req.params.author
  // );
  // if (book) res.send(book);
  // else {
  //   return res.status(404).json({ message: "Book not found" });
  // }
  let getBookByAuthor = new Promise((resolve, reject) => {
    const book = Object.values(books).find(
      ({ author }) => author === req.params.author
    );
    if (book) resolve(book);
    else {
      reject({ message: "Book not found" });
    }
  });
  getBookByAuthor
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(404).json(error);
    });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  // const book = Object.values(books).find(
  //   ({ title }) => title === req.params.title
  // );
  // if (book) res.send(book);
  // else {
  //   return res.status(404).json({ message: "Book not found" });
  // }
  let getBookByTitle = new Promise((resolve, reject) => {
    const book = Object.values(books).find(
      ({ title }) => title === req.params.title
    );
    if (book) resolve(book);
    else {
      reject({ message: "Book not found" });
    }
  });
  getBookByTitle
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(404).json(error);
    });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isb = req.params.isbn;
  const book = books[isb];
  if (book) res.send(book.reviews);
  else {
    res.status(404).json({ message: `There is not any book with ${isb}` });
  }
});

module.exports.general = public_users;
