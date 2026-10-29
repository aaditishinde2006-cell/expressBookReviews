
const reviews = {};

function getReviews(isbn) {
  return reviews[isbn] || {};
}

function addOrUpdateReview(isbn, username, review) {
  if (!reviews[isbn]) {
    reviews[isbn] = {};
  }

  reviews[isbn][username] = review;

  return {
    message: "Review added or updated successfully",
    reviews: reviews[isbn],
  };
}

function deleteReview(isbn, username) {
  if (reviews[isbn] && reviews[isbn][username]) {
    delete reviews[isbn][username];

    return { message: "Review deleted successfully" };
  }

  return { message: "Review not found" };
}

module.exports = {
  getReviews,
  addOrUpdateReview,
  deleteReview,
};
