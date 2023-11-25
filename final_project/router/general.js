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
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const book = Object.values(books).find(
    ({ author }) => author === req.params.author
  );
  res.send(book);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const book = Object.values(books).find(
    ({ title }) => title === req.params.title
  );
  res.send(book);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const book = req.params.isbn;
  res.send(book.reviews);
});

const req = axios.get("http://localhost:5000");

req
  .then((resp) => {
    let courseDetails = resp.data;
    console.log(JSON.stringify(courseDetails, null, 4));
  })
  .catch((err) => {
    console.log(err.toString());
    //This will console log the error withe the code. eg. Error: Request failed with status code 404
  });

module.exports.general = public_users;
