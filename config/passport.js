const localStrat = require("passport-local").Strategy;
const mongoose = require("mongoose"); // to check if email matches from db
const bcrypt = require("bcryptjs"); // to decrypt the password, aka comparing 

//Usr model
const User = require("../models/user");

// passportjs.org/docs/authenticate/
module.exports = function (passport) {
    passport.use(
        new localStrat({usernameField : "email"}, (email, password, done) => {
            //finding the user
            User.findOne({email: email}).then(
                user => {
                    //if the user exists
                    if (! user){
                       return done(null, false, {message : "Doesn't exist"}) 
                    }

                    //user exists
                    //decrypting the password
                    bcrypt.compare(password, user.password, (error, succes) => {
                        if (error) throw error;

                        if(succes) {
                            return done(null, user);
                        }else{
                            return done(null, false, {message: "Incorrect password"})
                        }


                    })
                }
            ).catch(err => console.log(err))
        })
    )
    //serializing and deserializing 
    // so only the password is sent in the login process, rest uses a cookie that identifies the user
    passport.serializeUser( (user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser( (id, done) => {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
}


