const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require: true
    },
    image:{
        filename:String,
        url:String
    },
    price:{
        type: Number,
        require: true
    },
    location:{
        type: String,
        require: true
    },
    country:{
        type:String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("listing", ListingSchema);