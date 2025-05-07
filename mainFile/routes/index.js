// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MAIN ROUTER FILE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const express = require("express");
const router = express.Router();

// require the other routes 
const listingRouter = require("./listingRoute.js");
const reviewRouter = require("./reviewRoute.js");


router.use("/listing", [listingRouter,reviewRouter]);
// router.use("/listing", );


module.exports = router;

