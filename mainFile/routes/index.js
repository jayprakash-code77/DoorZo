// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MAIN ROUTER FILE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const express = require("express");
const router = express.Router();

// require the other routes 
const listingRouter = require("./listingRoute.js");
const reviewRouter = require("./reviewRoute.js");


router.use("/listing", listingRouter);
router.use("/listing", reviewRouter);


module.exports = router;

