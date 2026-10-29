
const express = require("express");
const { registerUser, loginUser } = require("./user");
const {
  getReviews,
  addOrUpdateReview,
  deleteReview,
} = require("./review");

const app = express();
app.use(express.json());

const books = require("./books.json");

// Retrieve all books
app.get("/", (req, res) => {
  res.json(books);
});

// Search by ISBN
app.get("/isbn/:isbn", (req, res) => {
  const book = Object.values(books).find(
    (item) => item.isbn === req.params.isbn
  );

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// Search by author
app.get("/author/:author", (req, res) => {
  const results = Object.values(books).filter(
    (book) =>
      book.author.toLowerCase() === req.params.author.toLowerCase()
  );

  res.json(results);
});

// Search by title
app.get("/title/:title", (req, res) => {
  const results = Object.values(books).filter(
    (book) =>
      book.title.toLowerCase() === req.params.title.toLowerCase()
  );

  res.json(results);
});

// Retrieve reviews for a book
app.get("/review/:isbn", (req, res) => {
  res.json(getReviews(req.params.isbn));
});

// Register a user
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  const result = registerUser(username, password);
  res.status(result.success ? 201 : 409).json(result);
});

// Log in a user
app.post("/customer/login", (req, res) => {
  const { username, password } = req.body;
  const result = loginUser(username, password);

  res.status(result.success ? 200 : 401).json(result);
});

// Add or update a review
app.put("/review/:isbn", (req, res) => {
  const { username, review } = req.body;

  if (!username || !review) {
    return res.status(400).json({
      message: "Username and review are required",
    });
  }

  res.json(addOrUpdateReview(req.params.isbn, username, review));
});

// Delete a review
app.delete("/review/:isbn/:username", (req, res) => {
  res.json(deleteReview(req.params.isbn, req.params.username));
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Book Review API running on port ${PORT}`);
  });
}

module.exports = app;
