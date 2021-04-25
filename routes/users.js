const express = require("express");

// Creating a router 
const router = express.Router();


//Login 
router.get("/login" ,  (req, res) => {
    res.send("Login")
});

//Register route
router.get("/register" ,  (req, res) => {
    res.send("Register")
});


//exporting 
module.exports = router;