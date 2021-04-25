const express = require("express");

// Creating a router 
const router = express.Router();



router.get("/" ,  (req, res) => {
    res.send("Hello Darkness my old friend !!!")
});

//exporting 
module.exports = router;