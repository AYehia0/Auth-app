const express = require("express");

// requiring ensureAuthenticated 
const {ensureAuthenticated} = require("../config/auth");

// Creating a router 
const router = express.Router();

router.get("/" ,  (req, res) => {
    res.render("home")
});

// the dashboard after login
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    //passing the user
    res.render("dashboard" , {userName: req.user.username });
    console.log(res.user.name);
})

//exporting 
module.exports = router;