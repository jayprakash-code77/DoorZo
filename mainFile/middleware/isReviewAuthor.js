const { Review } = require("../models/review");
module.exports.isReviewAuthor = async (req, res, next) => {
    let { reviewId, id } = req.params;
    let reviews = await Review.findById(reviewId).populate("author");

    console.log(id, reviewId);
    
    // logged-in user ID
    const currentLoggedInUser = req.user;

    if (currentLoggedInUser && reviews.author._id.equals(currentLoggedInUser._id)) {
        next();
        return;
    }

    req.flash("error", "You are not the author of this review.")

    res.redirect(`/listing/${id}`);
}