
const express = require("express");
const fs = require("fs");
const path = require("path");
const {
  registerUser,
  loginUser
} = require("./user");
const {
  getReviews,
  addOrUpdateReview,
  deleteReview
} = require("./review");

const app = express();
app.use(express.json());

const booksFile = path.join(__dirname, "books.json");

function loadBooks() {
  return JSON.parse(fs.readFileSync(booksFile, "utf8"));
}

// Get all books
app.get("/", (req, res) => {
  res.json(loadBooks());
});

// Get a book by ISBN
app.get("/isbn/:isbn", (req, res) => {
  const books = loadBooks();
  const book = Object.values(books).find(
    b => String(b.isbn || Object.keys(books).find(k => books[k] === b)) ===
         String(req.params.isbn)
  );

  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }

  res.json(book);
});

// Get books by author
app.get("/author/:author", (req, res) => {
  const books = loadBooks();
  const matches = Object.entries(books)
    .filter(([, b]) =>
      b.author?.toLowerCase() === req.params.author.toLowerCase()
    )
    .map(([isbn, b]) => ({ isbn, ...b }));

  if (!matches.length) {
    return res.status(404).json({ message: "Books not found." });
  }

  res.json(matches);
});

// Get books by title
app.get("/title", (req, res) => {
  const title = req.query.title;
  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }

  const books = loadBooks();
  const matches = Object.entries(books)
    .filter(([, b]) =>
      b.title?.toLowerCase() === title.toLowerCase()
    )
    .map(([isbn, b]) => ({ isbn, ...b }));

  if (!matches.length) {
    return res.status(404).json({ message: "Books not found." });
  }

  res.json(matches);
});

// Get reviews for a book
app.get("/review/:isbn", (req, res) => {
  const books = loadBooks();
  const isbn = req.params.isbn;
  const book = books[isbn] ||
    Object.values(books).find(b => String(b.isbn) === isbn);

  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }

  const reviews = book.reviews || {};
  if (!Object.keys(reviews).length) {
    return res.json({ message: "No reviews found for this book." });
  }

  res.json(reviews);
});

// Register a user
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required."
    });
  }

  const result = registerUser(username, password);
  res.status(result.success === false ? 400 : 200).json(
    result.message ? result : {
      message: "User successfully registered. Now you can login"
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required."
    });
  }

  const result = loginUser(username, password);
  res.status(result.success === false ? 401 : 200).json(
    result.message ? result : { message: "Login successful!" }
  );
});

// Add or update a review
app.put("/review", (req, res) => {
  const { isbn, username, review } = req.body;

  if (!isbn || !username || !review) {
    return res.status(400).json({
      message: "ISBN, username and review are required."
    });
  }

  const books = loadBooks();
  const key = Object.keys(books).find(
    k => k === String(isbn) || String(books[k].isbn) === String(isbn)
  );

  if (!key) {
    return res.status(404).json({ message: "Book not found." });
  }

  const result = addOrUpdateReview(String(isbn), username, review);
  const reviews = result?.reviews || getReviews(String(isbn)) || {
    [username]: review
  };

  res.json({
    message: "Review added/updated successfully",
    reviews
  });
});

// Delete a review
app.delete("/review", (req, res) => {
  const { isbn, username } = req.body;

  if (!isbn || !username) {
    return res.status(400).json({
      message: "ISBN and username are required."
    });
  }

  deleteReview(String(isbn), username);

  res.json({ message: `Review for ISBN ${isbn} deleted` });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Book Review API running on port ${PORT}`);
  });
}

module.exports = app;
