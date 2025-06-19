const { User } = require("../models/user");


module.exports.renderSignupForm = (req, res) => {
    res.render("./auth/register.ejs");
};


module.exports.signupUser = async (req, res) => {
    try {
        // object destructuring
        let { fullname, email, username, password, phone } = req.body.user;
        // new user creation
        const newUser = new User({ fullname, email, username, phone });
        // registering user
        const registeredUser = await User.register(newUser, password);

        // debug 
        console.log(registeredUser, "Inside the /routes/authRoute");

        // login automatically just after signup
        req.login(registeredUser, (error) => {
            // if any error occures, call next with the error as parameter.
            if (error) {
                return next(error);
            }

            // if there are no error :- 

            // flash message
            req.flash("success", "You registered successfully!!!");

            // redirect
            res.redirect("/listing");

        })

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/auth/signup");
        // Problem: JM_01 : If the user exists, the user will be re-directed to the same signup page. User have to fill the whole details again which is a bad user experience. Also look at the details to te implementation for the error handling.
    }
};


module.exports.renderLoginForm = (req, res) => {
    res.render("./auth/login.ejs");
};


module.exports.loginUser = async function (req, res) {
    req.flash("success", "TravelToTravel Welcomes You!!!");

    // The will will be redirected to the path on which he was trying to access but because he/she was nit logged-in, was not able to accesss the page.
    const redirectURL = res.locals.redirectURL || "/listing"; // "res.locals.redirectURL" this initialization is done at /middleware/authMiddleware.js.
    res.redirect(redirectURL);
};


module.exports.logoutUser = (req, res, next) => {
    req.logOut((error) => {
        if (error) {
            next(error);
        }
        // flash message for logout
        req.flash("success", "You logged out successfully!!!");
        res.redirect("/listing");
    })
};
