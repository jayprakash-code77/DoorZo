const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { Listing } = require("../models/listing.js");
const { validateListing } = require("../middleware/schemaValidationMW.js");


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
// index rout. api to get all lists
router.get(
    "/",
    wrapAsync(async (req, res) => {

        let allListings = await Listing.find({});
        // console.log(allListings);
        res.render("allListings.ejs", { list: allListings, isValidImageUrl });
    })
);


// new rout
router.get("/new", (req, res) => {
    res.render("new.ejs");
})


// show rout
router.get("/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");

    // if the listing does not exist but still we are trying to access it. So the flash message will be displayed.
    if (!listing) {
        req.flash("error", "Listing that you, requested for does not exist!");
        res.redirect("/listing");
    }

    // rednering
    res.render("show.ejs", { listing, isValidImageUrl });
});



// create rout
router.post(
    "/",
    validateListing,
    wrapAsync(async (req, res, next) => {
        // accesing the listing object just for undertanding. This object is not used anywhere. 
        let listing = req.body.listing; // this will return the "listing object" created during the input of data in new.ejs

        // making the proper formate for the Listing object
        req.body.listing.image = { url: req.body.listing.image };

        // create new listing
        let newListing = new Listing(req.body.listing);
        // saving the new list
        await newListing.save();

        // debug
        // console.log(req.body.listing, "From : listingRoute.js");

        // creating the flash message 
        req.flash("success", "Listing created successfully!!!");

        // redirect
        res.redirect("/listing");
    })
);




// rout for rendering the edit page with data of the list.
router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let listing = await Listing.findById(id);

        // if the listing does not exist but still we are trying to access it. So the flash message will be displayed.
        if (!listing) {
            req.flash("error", "Listing that you, requested for does not exist!");
            res.redirect("/listing");
        }
        
        console.log(listing);
        res.render("edit.ejs", { listing });
    })
);



// rout ot update the list with the new data coming from edit request
router.put(
    "/:id",
    validateListing,
    wrapAsync(async (req, res) => {
        // accesing the updated list object. In this object, the image will not be an object itself. We we will the image as an object according to the schema.
        let listing = req.body.listing;

        // Re-formating the image element of the Lisiting object that is coming from edit.ejs. Making the image element an object with {url = req.body.listing.image}
        req.body.listing.image = { url: req.body.listing.image };


        await Listing.findByIdAndUpdate(req.params.id, req.body.listing);

        // creating the flash message for update listing
        req.flash("success", "List updated successfully!!!");

        // redirect 
        res.redirect(`/listing/${req.params.id}`);
    })
);


// delete rout
router.delete(
    "/:id",
    wrapAsync(async (req, res) => {

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
    })
);

module.exports = router;