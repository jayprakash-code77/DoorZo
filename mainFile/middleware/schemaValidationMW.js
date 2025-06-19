const Joi = require('joi');
const ExpressError = require("../utils/ExpressError.js");

// Validating the Schema by using the "JOI".

// "Joi" object for Listing schema
const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.object({
            url: Joi.string(),
            filename: Joi.string()
        }).allow("", null),
        geometry: Joi.object({
            type: Joi.string().valid("Point"),
            coordinates: Joi.array()
                .items(Joi.number())
                .length(2) // Must contain exactly [longitude, latitude]
                .required()
        })
    }).required()
});


// "Joi" object for Review Schema
const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
        userId: Joi.string(),
        listId: Joi.string(),
    }).required(),
});



// middleware function for listing schema validation
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let msg = error.details.map(el => el.message).join(", ");
        console.log(msg, " from misslwares folderS");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}

// middleware function for review schema validation
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let msg = error.details.map(el => el.message).join(", ");
        console.log(msg, " from misslwares folderS");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}

module.exports = { validateListing, validateReview };











