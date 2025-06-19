// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MAIN ROUTER FILE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const express = require("express");
const router = express.Router();

// require the other routes 
const listingRouter = require("./listingRoute.js");
const reviewRouter = require("./reviewRoute.js");
const userRouter = require("./authRoute.js");

// Listing and Review router
router.use("/listing", [listingRouter,reviewRouter]);
// router.use("/listing", );

// User router 
router.use("/auth", userRouter);



module.exports = router;

