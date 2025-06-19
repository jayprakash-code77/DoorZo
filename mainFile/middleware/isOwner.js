const { Listing } = require("../models/listing");

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    // console.log(id);
    
    let listing = await Listing.findById(id);
    // console.log(listing);
    
    let currentLoggedUser = req.user;

    if(!listing.owner.equals(currentLoggedUser._id)) { // here the "listing.owner" will be the id of of user who has created this listing. It will not be an object because we are not populating the owner property during the "findById" operation. 
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listing/${id}`);
    }

    next();
}