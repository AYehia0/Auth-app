const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const app = express();

const PORT = process.env.PORT || 6969


//connecting to the database 
mongoose.connect("mongodb://localhost:27017/users", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 })

//using the ejs template
app.use(ejsLayouts);
//setting the view engine as ejs
app.set("view engine", "ejs");

//using the body parser
app.use(bodyParser.urlencoded({ extended: false }))

//routes 
app.use("/", indexRoutes);
// users/login or users/register
app.use("/users", userRoutes);

app.listen(PORT, console.log(`Server running at port ${PORT}`))
