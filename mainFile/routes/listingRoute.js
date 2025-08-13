const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing } = require("../middleware/schemaValidationMW.js");
const { isLoggedIn } = require("../middleware/authMiddleware.js");
const { isOwner } = require("../middleware/isOwner.js");


// controllers for listing
const listingController = require("../controllers/listingController.js");


// multer is used for parsing and storing the bigger data coming from form through the request body.
const multer = require('multer')
const { storage } = require("../config/cloudConfig.js");
const upload = multer({ storage });







// Router.route to "get all lists" and "create rout"
router.route("/")
    .get(wrapAsync(listingController.showAllListing)) // index rout. api to get all lists
    .post(isLoggedIn, // new rout to create new Listing
        upload.single('listing[image]'),  // this is the middleware of "multer lib" that will check and add an "file" object to the "request "req" body ".
        validateListing,
        wrapAsync(listingController.createListing)
    );


// new rout
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.get("/search", (req, res) => {
    res.send(`Query is : ${req.query.filter}`);
});




// Router.route to "show a perticular listing" and "to update the the particular listing"
router.route("/:id")
    .get(listingController.showListing) // show rout to show a particular listing in detail
    .put( // rout to update the list with the new data coming from edit request
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing, 
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, // delete rout to delete the particular listing.
        isOwner,
        wrapAsync(listingController.destroyListing));

// rout for rendering the edit page with data of the list.
router.get(
    "/:id/edit",
    isLoggedIn, // this MW will check if the user is logged-in OR not.
    isOwner, // this MW will make sure only owner can edit the listing.
    wrapAsync(listingController.renderEditForm)
);





// router.get("/search", (req, res) => {
//     res.send("Query is :", req.query.filter);
// })


// router.get("/search", (req, res) => {
//     res.send(`Query is : ${req.query.filter}`);
// });



/*
// index rout. api to get all lists
router.get("/", wrapAsync(listingController.showAllListing));


// show rout
router.get("/:id", listingController.showListing);


// create rout
router.post(
    "/",
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
);


// rout to update the list with the new data coming from edit request
router.put(
    "/:id",
    validateListing,
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.updateListing)
);


// delete rout
router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
);
*/

module.exports = router;