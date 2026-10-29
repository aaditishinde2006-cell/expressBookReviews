
const axios = require("axios");

const BASE_URL = "http://localhost:5000";

async function requestBooks(path, params = {}) {
  try {
    const response = await axios.get(`${BASE_URL}${path}`, {
      params,
      validateStatus: () => true
    });

    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        status: response.status,
        data: response.data
      };
    }

    if (response.status === 404) {
      return {
        success: false,
        status: 404,
        message: "Books not found."
      };
    }

    return {
      success: false,
      status: response.status,
      message: response.data?.message || "Request failed."
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status || 0,
      message: error.message
    };
  }
}

async function getAllBooks(books) {
  if (books !== undefined) {
    return {
      success: true,
      status: 200,
      data: books
    };
  }

  return requestBooks("/");
}

async function getBookByISBN(isbn, books) {
  if (books !== undefined) {
    const book = Object.values(books).find(
      item => String(item.isbn) === String(isbn)
    );

    return book
      ? { success: true, status: 200, data: book }
      : { success: false, status: 404, message: "Book not found." };
  }

  if (!isbn) {
    return { success: false, status: 400, message: "ISBN is required." };
  }

  return requestBooks(`/isbn/${encodeURIComponent(isbn)}`);
}

async function getBooksByAuthor(author, books) {
  if (books !== undefined) {
    const matches = Object.values(books).filter(
      item => item.author?.toLowerCase() === author?.toLowerCase()
    );

    return matches.length
      ? { success: true, status: 200, data: matches }
      : { success: false, status: 404, message: "Books not found." };
  }

  if (!author) {
    return { success: false, status: 400, message: "Author is required." };
  }

  return requestBooks(`/author/${encodeURIComponent(author)}`);
}

async function getBooksByTitle(title, books) {
  if (books !== undefined) {
    const matches = Object.values(books).filter(
      item => item.title?.toLowerCase() === title?.toLowerCase()
    );

    return matches.length
      ? { success: true, status: 200, data: matches }
      : { success: false, status: 404, message: "Books not found." };
  }

  if (!title) {
    return { success: false, status: 400, message: "Title is required." };
  }

  return requestBooks("/title", { title });
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
