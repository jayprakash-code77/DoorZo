const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");

// database configuration
require("./config/dbConfig.js");


// required the main route file
const routes = require("./routes/index.js");


// Models Required
const {Listing} = require("./models/listing");


// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // This is important!
// For parsing application/json 
app.use(express.json()); // If you are sending JSON data
// Set EJS as the view engine
app.set('views engine', 'ejs');
// setting the path
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
// use ejs-locals for all ejs templates:
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname, "public")));



// using the routes from route directory
app.use("/", routes);



// home rout
app.get(
    "/",
    wrapAsync(async (req, res) => {
        let allListings = await Listing.find({}).limit(6);
        res.render("home.ejs", { featuredList: allListings });
    })
);



// this will handle all the request which are sent on the invalid rout
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!!!"));
});

// this middleware will handle all the errors that will occure in the page
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!!!" } = err;
    // console.log(err.stack);
    res.status(statusCode).render("error.ejs", { err });
});


app.listen(8080, () => {
    console.log("Sever is listening on port 8080...");
});

