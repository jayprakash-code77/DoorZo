module.exports.isLoggedIn = (req, res, next) => {


    // debug 
    console.log("From the Middleware/authMiddleware :", req.user);

    /*
    // Log the currentUser user details
    
    console.log(req, " From /middleware/authMiddleware");
    console.log(req.Url);
    console.log(req.originalUrl);
    */

    // "isAuthenticated()" method will return true if logged-in. else it will return false.
    if(!req.isAuthenticated()) {
        console.log("This is inside the isAuthenticate");
        
        // storing the path on which the user tried to go but, the user came to login page because he/she was not logged-in.
        req.session.redirectURL = req.originalUrl;

        req.flash("error", "You are not logged-in, Please Login.");
        return res.redirect("/auth/login");
    }
    // if the user is authenticated, call the "next()".
    next();
}


// This middlware is used at : /routes/authRoute
// middleware to save the Redirect URL, to which the user tried to access but was not able to access to the user was not logged-in.
module.exports.saveRedirectURL = (req, res, next) => {
    if(req.session.redirectURL) {
        res.locals.redirectURL = req.session.redirectURL; // "req.session.redirectURL" this intialization is present at : /middleware/authMiddleware (In this file, at the top).
    }
    
    next();
}