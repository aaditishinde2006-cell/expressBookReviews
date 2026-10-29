# Express Book Review API

## Project Overview

A Node.js and Express.js application for managing an online bookstore. The API provides book retrieval, searching, user registration and login, and book review management.

## Features

- Retrieve all available books.
- Search books by ISBN.
- Search books by author.
- Search books by title.
- Retrieve reviews for books.
- Register new users and log in.
- Add and update book reviews.
- Delete book reviews.

## Technologies

- Node.js
- Express.js
- JavaScript
- Axios
- JSON

## Main Files

- `app.js` — Express server and API routes
- `general.js` — Book retrieval functions
- `books.json` — Sample book data
- `user.js` — Registration and login helpers
- `review.js` — Review management helpers
- `package.json` — Project configuration

## Running the Application

Install dependencies and start the server:

```bash
npm install
npm start
```

The default local server address is `http://localhost:5000`.

## Note

This repository is a standalone implementation. It has not been verified against the IBM course's original starter repository or supplied book dataset.
