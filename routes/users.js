const express = require("express");

// Creating a router 
const router = express.Router();


//Login 
router.get("/login" ,  (req, res) => {
    res.render("login")
});

//Register route
router.get("/register" ,  (req, res) => {
    res.render("register")
});


//exporting 
module.exports = router;