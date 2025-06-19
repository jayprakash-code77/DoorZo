const express = require("express");
const router = express.Router();

// MW's 
const { isLoggedIn } = require("../middleware/authMiddleware.js");

// middleware for for schema validation
const { validateReview } = require("../middleware/schemaValidationMW.js");

// MW to check weather the user is the author of the review or not
const { isReviewAuthor } = require("../middleware/isReviewAuthor.js");

// middleware to handle the errors
const wrapAsync = require("../utils/wrapAsync.js");

// review controller
const reviewController = require("../controllers/reviewController.js");



// Input review route
router.post(
    "/:id/review",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);


// Delete review route
router.delete(
    "/:id/review/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);



module.exports = router;
