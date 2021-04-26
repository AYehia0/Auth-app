const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
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

        User.findOne({
            email:email
        }).then(user => {

            if(user) {
                //user exists 
                errs.push({errorMsg: "User exists"});
                //re-render the register page
                res.render("register", {
                    // given back the fields so since rendering the html removes the writen form
                    errs,
                    name,
                    email,
                    password1,
                    password2
                });   
            }else{
                //creating the instance ,, must be saved 
                const newUser = new User({
                    username: name,
                    email: email,
                    password: password1
                })
                    //hashing the password 
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash)=> {
                            if (err) throw err;
                            newUser.password = hash;
                            
                            //saving the user
                            newUser.save().then(user => {
                                req.flash("success_msg", "You can now regitered, you can login now.") // now add it to the message template
                                res.redirect("/users/login");
                            }).catch(error => {
                                console.log(error);
                            })
                        })
                    });
            }
        })
    }
});

//exporting 
module.exports = router;

