const mongoose = require("mongoose");
const { Schema } = mongoose;    
const ReviewSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    listId: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        // required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true // adds createdAt and updatedAt timestamps
});

// review model
const Review = mongoose.model("Review", ReviewSchema);

// exporting the model and schema both
module.exports = {Review, ReviewSchema};