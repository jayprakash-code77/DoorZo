const mongoose = require("mongoose");
const { Schema } = mongoose;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },            
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        unique: false,
        required:false,
        allow: null
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



// using the "Passport Local Mongoose". This will add "username and password" field to the "userSchema".
userSchema.plugin(PassportLocalMongoose);


/*
// this are the two fields that are automatically added by the "PassportLocalMongoose".
    username: {
        type: String,
        required: true,
        unique: true
    },  
    password: {
        type: String,
        required: true
    },

*/

// User model
const User = mongoose.model("User",userSchema);

module.exports = {User, userSchema};

