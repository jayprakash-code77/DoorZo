const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { Review } = require("./review");
const { User } = require("./user");

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: String,
        enum: ['Trending', 'Rooms', 'Villa', 'Castles', 'Mountains', 'Pools', 'Camping', 'Farms', 'Arctic', 'All List'], // Define your allowed categories
        default: 'All List'
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
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
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