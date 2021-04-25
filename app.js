const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const app = express();

const PORT = process.env.PORT || 6969

//using the ejs template
app.use(ejsLayouts);
//setting the view engine as ejs
app.set("view engine", "ejs");


//routes 
app.use("/", indexRoutes);
// users/login or users/register
app.use("/users", userRoutes);




app.listen(PORT, console.log(`Server running at port ${PORT}`))
