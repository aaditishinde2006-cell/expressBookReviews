
const axios = require("axios");

const books = "http://localhost:5000";

// Retrieve all books
async function getAllBooks() {
  try {
    const response = await axios.get(`${books}/`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving books:", error.message);
    throw error;
  }
}

// Search books by ISBN
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`${books}/isbn/${encodeURIComponent(isbn)}`);
    return response.data;
  } catch (error) {
    console.error("Error searching by ISBN:", error.message);
    throw error;
  }
}

// Search books by author
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${books}/author/${encodeURIComponent(author)}`);
    return response.data;
  } catch (error) {
    console.error("Error searching by author:", error.message);
    throw error;
  }
}

// Search books by title
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${books}/title/${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error("Error searching by title:", error.message);
    throw error;
  }
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
};
