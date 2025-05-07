const express = require("express");
const router = express.Router();

// middleware for for schema validation
const { validateReview } = require("../middleware/schemaValidationMW.js");

// middleware to handle the errors
const wrapAsync = require("../utils/wrapAsync.js");

// require models
const { Review } = require("../models/review.js");
const { Listing } = require("../models/listing.js");



// Input review route
router.post(
    "/:id/review",
    validateReview,
    wrapAsync(async (req, res) => {
        let id = req.params.id;
        let data = req.body.review;

        // creating the new review //
        let newReview = new Review(data);

        // adding the reference of review to the list
        let list = await Listing.findById({ _id: id });
        list.reviews.push(newReview);

        // saving the changes
        await list.save();
        await newReview.save();

        // debug
        console.log("Review created for :",id);

        // creating the flash message 
        req.flash("success","Review created!!!");

        // redirect
        res.redirect(`/listing/${id}`);
    }));


// Delete review route
router.delete(
    "/:id/review/:reviewId",
    wrapAsync(async (req, res) => {
        let { id, reviewId } = req.params;

        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        let deletedReview = await Review.findByIdAndDelete(reviewId);
        
        // debug
        console.log("Review Deleted :",deletedReview);

        // creating flash message for deleted review
        req.flash("success","Review deleted!!!");

        // redirect
        res.redirect(`/listing/${id}`);
    }));



module.exports = router;
