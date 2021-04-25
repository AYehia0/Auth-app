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

//handling the post req
router.post("/register", (req, res) =>{

    // getting info 
    const {name , email, password1, password2} = req.body;

    //validaions 
    //this is some cool idea i saw in the tut
    var errs = [];

    if (!name || !email || !password1 || !password2) {
        errs.push({errorMsg : "Empty cells"});
    }

    if (password1 !== password2) {
        errs.push({errorMsg : "Passwords don't match"});
    }

    try {
        if (password1.length < 6) {
            errs.push({errorMsg : "Length is small, must be 6>"});
        }
    } catch (error) {
        errs.push({errorMsg : "Password can't be empty"});
    }
    if (errs.length > 0 ) {
        //failed to register
        //re render the page 

        console.log(errs);
        res.render("register", {
            // given back the fields so since rendering the html removes the writen form
            errs,
            name,
            email,
            password1,
            password2
        });

    }else{
        //passed 
        res.send("passed")
    }
});

//exporting 
module.exports = router;

