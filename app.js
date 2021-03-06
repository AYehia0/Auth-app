const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')


//flash messages 
const flash = require("connect-flash");
const session = require("express-session");

//passport 
const passport = require("passport");

//passport config ,, custom config made
require("./config/passport")(passport);


const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const app = express();

const PORT = process.env.PORT || 6969


//connecting to the database 
mongoose.connect("mongodb://localhost:27017/users", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
 })
 
 //showing all the records
 //db.users.find().pretty()

//using the ejs template
app.use(ejsLayouts);
//setting the view engine as ejs
app.set("view engine", "ejs");

//using the body parser
app.use(bodyParser.urlencoded({ extended: false }))

//express session , check out the documectations 
app.use(session({
    secret:"TOPSECRET696969",
    resave: true, // what are those ?
    saveUninitialized: true
}))

// passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash 
app.use(flash());


// some global var for flash messages 
// call the flash message on redirect 
app.use((req,res,next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})

//routes 
app.use("/", indexRoutes);
// users/login or users/register
app.use("/users", userRoutes);

app.listen(PORT, console.log(`Server running at port ${PORT}`))
