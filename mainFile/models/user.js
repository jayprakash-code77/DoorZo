const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({            
    username: {
        type: String,
        required: true,
        unique: true
    },  
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true
    },
    profileImage: {
        filename: String,
        url: String
    },
    listings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing"
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, {
    timestamps: true
});

moduule.exports = mongoose.model("User",userSchema);

