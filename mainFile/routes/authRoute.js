const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

// middlewares
const { saveRedirectURL } = require("../middleware/authMiddleware");

// user controllers
const userController = require("../controllers/userController");


// router.route to "render the signup form and singup the user"
router.route("/signup")
  .get(userController.renderSignupForm) // signup GET
  .post(wrapAsync(userController.signupUser)) // signup POST


router.route("/login")
  .get(userController.renderLoginForm) // login GET
  .post(saveRedirectURL, // login POST
    // this middleware re-sets the session, so any parameter is intialized before this middleware, will be erased.
    passport.authenticate('local', {
      failureRedirect: '/auth/login',
      failureFlash: true
    }),
    userController.loginUser
  )


  // Logout 
router.get("/logout", userController.logoutUser);


/*
// signup GET
router.get("/signup", userController.renderSignupForm);

// signup POST
router.post(
  "/signup",
  wrapAsync(userController.signupUser)
);

// login GET
router.get("/login", userController.renderLoginForm);

// login POST
router.post('/login',
  // "saveRedirectURL" middleware
  saveRedirectURL,
  // this middleware re-sets the session, so any parameter is intialized before this middleware, will be erased.
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
    failureFlash: true
  }),
  userController.loginUser
);
*/


module.exports = router;