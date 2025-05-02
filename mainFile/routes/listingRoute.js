const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {Listing} = require("../models/listing.js");
const { validateListing } = require("../middleware/schemaValidationMW.js");


// index rout. api to get all lists
router.get(
    "/",
    wrapAsync(async (req, res) => {

        let allListings = await Listing.find({});
        // console.log(allListings);
        res.render("allListings.ejs", { list: allListings });
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
    res.render("show.ejs", { listing });
});



// create rout
router.post(
    "/",
    validateListing,
    wrapAsync(async (req, res, next) => {
        let listing = req.body.listing; // this will return the "listing object" created during the input of data in new.ejs

        const finalDataObj = {
            ...listing, image: {
                url: req.body.imageURL
            }
        };

        let newListing = new Listing(finalDataObj);
        await newListing.save();

        console.log(finalDataObj);
        res.redirect("/listing");
    })
);




// rout for rendering the edit page with data of the list.
router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let listing = await Listing.findById(id);
        console.log(listing);
        res.render("edit.ejs", { listing });
    })
);



// rout ot update the list with the new data coming from edit request
router.put(
    "/:id",
    validateListing,
    wrapAsync(async (req, res) => {
        let listing = req.body.listing;
        let finalDataObj = {
            ...listing, image: {
                url: req.body.imageURL
            }
        }
        await Listing.findByIdAndUpdate(req.params.id, { ...finalDataObj });
        res.redirect(`/listing/${req.params.id}`);
    })
);


// delete rout
router.delete(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedLisitng = await Listing.findByIdAndDelete(id);
        console.log(deletedLisitng);
        res.redirect("/listing");
    })
);

module.exports = router;