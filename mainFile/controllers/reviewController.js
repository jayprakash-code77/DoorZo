const { Listing } = require("../models/listing");
const { Review } = require("../models/review");

module.exports.createReview = async (req, res) => {
    let id = req.params.id;
    let data = req.body.review;
    let finalData = { ...data, listId: id, author: req.user._id };

    // creating the new review //
    let newReview = new Review(finalData);

    // adding the reference of review to the list
    let list = await Listing.findById({ _id: id });
    list.reviews.push(newReview);

    // saving the changes
    await list.save();
    await newReview.save();

    // debug
    console.log("Review created for :", id);

    // creating the flash message 
    req.flash("success", "Review created!!!");

    // redirect
    res.redirect(`/listing/${id}`);
};



module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    let deletedReview = await Review.findByIdAndDelete(reviewId);

    // debug
    console.log("Review Deleted :", deletedReview);

    // creating flash message for deleted review
    req.flash("success", "Review deleted!!!");

    // redirect
    res.redirect(`/listing/${id}`);
}








