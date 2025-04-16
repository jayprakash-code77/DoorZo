const express = require("express");
const app = express();
const mongoose = require("./config/dbConfig");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const listingSchema = require("./schemaValidation.js");

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // This is important!
// For parsing application/json (if you need it)
app.use(express.json()); // If you are sending JSON data
// Set EJS as the view engine
app.set('views engine', 'ejs');
// setting the path
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
// use ejs-locals for all ejs templates:
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname, "public")));





// home rout
app.get(
    "/",
    wrapAsync(async (req, res) => {
        let allListings = await Listing.find({}).limit(6);
        res.render("home.ejs", { featuredList: allListings });
    })
);


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, error);
    } else {
        next();
    }
}



// index rout. api to get all lists
app.get(
    "/listing",
    wrapAsync(async (req, res) => {

        let allListings = await Listing.find({});
        // console.log(allListings);
        res.render("allListings.ejs", { list: allListings });
    })
);

// new rout
app.get("/listing/new", (req, res) => {
    res.render("new.ejs");
})


// show rout
app.get("/listing/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("show.ejs", { listing });
});





// create rout
app.post(
    "/listing",
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
app.get(
    "/listing/:id/edit",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let listing = await Listing.findById(id);
        console.log(listing);
        res.render("edit.ejs", { listing });
    })
);



// rout ot update the list with the new data coming from edit request
app.put(
    "/listing/:id",
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
app.delete(
    "/listing/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedLisitng = await Listing.findByIdAndDelete(id);
        console.log(deletedLisitng);
        res.redirect("/listing");
    })
);




// this will handle all the request which are sent on the invalid rout
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!!!"));
});

// this middleware will handle all the errors that will occure in the page
app.use((err, req, res, next) => {
    let{statusCode=500, message="Something went wrong!!!"} = err;
    // console.log(err.stack);
    res.status(statusCode).render("error.ejs", { err });
});


app.listen(8080, () => {
    console.log("Sever is listening on port 8080...");
});




























/*
app.get("/testListing", async (req, res) => {
    try {
        let sampleListing = new Listing({
            title: "First Villa",
            description: "This is a really beautiful villa in South Bombay.",
            price: 22000,
            location: "South Bombay",
            country: "India"
        });
        // Save to the database
        await sampleListing.save();

        // Send success response
        // res.status(201).json({ message: "Listing created successfully!", sampleListing });
        res.send("Successful!!!");
    } catch (error) {
        // Handle errors
        // res.status(500).json({ message: "Error creating listing", error });
        res.status(500).send("Some error occured in listing ", error);
    }
});
*/