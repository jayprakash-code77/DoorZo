const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { Review } = require("./review");

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        filename: String,
        url: String
    },
    price: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, {
    timestamps: true
});


// post middleware of listing for "findOneAndDelete".
ListingSchema.post("findOneAndDelete", async (list) => {
    if (list) {
        await Review.deleteMany({ _id: { $in: list.reviews } });
        // debug
        console.log("List deleted and it's reviews are also deleted. Filename : middleware/postMiddleware.js");
    }
});


// listing model
let Listing = mongoose.model("listing", ListingSchema);

// exporting the model and schema both
module.exports = { Listing, ListingSchema };