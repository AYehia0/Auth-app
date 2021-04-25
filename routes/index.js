const express = require("express");

// Creating a router 
const router = express.Router();



router.get("/" ,  (req, res) => {
    res.render("home")
});

//exporting 
module.exports = router;