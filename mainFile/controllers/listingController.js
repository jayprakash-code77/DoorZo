const { Review } = require("../models/review");
const { Listing } = require("../models/listing");
const geocodeLocation = require("../utils/geocode");

// function to check if the the url is a link or some random string
function isValidImageUrl(url) {
    try {
        const parsed = new URL(url);
        const allowedHosts = [
            "images.unsplash.com",
            "unsplash.com",
            "res.cloudinary.com",
            "cdn.pixabay.com"
            // Add more trusted domains if needed
        ];
        return allowedHosts.includes(parsed.hostname);
    } catch (err) {
        return false;
    }
}

module.exports.showAllListing = async (req, res) => {
    let allListings = await Listing.find({});
    // console.log(allListings);
    res.render("allListings.ejs", { list: allListings, isValidImageUrl });
};


module.exports.renderNewForm = (req, res) => {
    res.render("new.ejs");
};



module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    // if the listing does not exist but still we are trying to access it. So the flash message will be displayed.
    if (!listing) {
        req.flash("error", "Listing that you, requested for does not exist!");
        res.redirect("/listing");
    }

    // rednering
    res.render("show.ejs", { listing, isValidImageUrl });
};



module.exports.createListing = async (req, res, next) => {
    // accesing the listing object just for undertanding. This object is not used anywhere. 
    let listing = req.body.listing; // this will return the "listing object" created during the input of data in new.ejs

    // Get the cordinates
    const coords = await geocodeLocation(listing.location,listing.country);

    // Debug
    /*
    console.log("This geometric co-orrdinates from /constrollers/listingController{creatLisitng} :",coords);
    */
    

    // if cordinates are not found, return to /listing/new
    if (!coords) {
        req.flash("error", "Could not find the location.");
        return res.redirect("/listing/new");
    }

    // add cordinates to the listing object in the req.body
      req.body.listing.geometry = coords;


      

    // making the proper formate for the Listing object
    req.body.listing.image = {
        url: req.file.path,
        filename: req.file.filename
    };

    // create new listing
    let newListing = new Listing(req.body.listing);

    // here we are adding the "owner" id to the newListing object during listing creation.
    newListing.owner = req.user._id;

    // saving the new list
    await newListing.save();

    // debug
    /*
    console.log(req.body.listing, "From : listingRoute.js");

    */

    // creating the flash message 
    req.flash("success", "Listing created successfully!!!");

    // redirect
    res.redirect("/listing");
};


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);



    // if the listing does not exist but still we are trying to access it. So the flash message will be displayed.
    if (!listing) {
        req.flash("error", "Listing that you, requested for does not exist!");
        return res.redirect("/listing");
    }

    // transforming the image using the "cloudinary url parameters" DOcs link : https://cloudinary.com/documentation/image_transformations
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_200");

    // console.log(listing);
    res.render("edit.ejs", { listing, originalImageUrl });
};



module.exports.updateListing = async (req, res) => {
    // accesing the updated list object. In this object, the image will not be an object itself. We we will the image as an object according to the schema.
    let listing = req.body.listing;

    // Re-formating the image element of the Lisiting object that is coming from edit.ejs. Making the image element an object with {url = req.body.listing.image}
    if (typeof req.file != "undefined") {
        req.body.listing.image = {
            url: req.file.path,
            file: req.file.filename
        };
    };



    await Listing.findByIdAndUpdate(req.params.id, { ...req.body.listing });


    // creating the flash message for update listing
    req.flash("success", "List updated successfully!!!");

    // redirect 
    res.redirect(`/listing/${req.params.id}`);
};



module.exports.destroyListing = async (req, res) => {

    // taking "id" from the req parameters
    let { id } = req.params;
    // deleting the listing
    let deletedLisitng = await Listing.findByIdAndDelete(id);

    // debug
    console.log(deletedLisitng);

    // creating the flash message for the list deleted successfully.
    req.flash("success", "Listing deleted successfully!!!");

    // redirect
    res.redirect("/listing");
};


