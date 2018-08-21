var authController = require("../controllers/authcontroller.js");
 
module.exports = function(app, passport) 
{
 
    app.get("/join", authController.signup);

    app.get("/login", authController.signin);
 
    app.post("/join", passport.authenticate("local-signup", 
        {
            successRedirect: "/quiz",
    
            failureRedirect: "/"
        }
    ));

    app.post("/login", passport.authenticate("local-signin", 
        {
            successRedirect: "/",
    
            failureRedirect: "/login"
        }
    ));

    app.get("/dashboard",authController.dashboard);

    app.get("/logout",authController.logout);

    function isLoggedIn(req, res, next) 
    {
        if (req.isAuthenticated())
        {    
            return next();
        }

        res.redirect("join");
    }
}