// to make sure that none can just go to /dashboard and boom they are in

module.exports = {
    // we can use ensureAuthenticated to protect any route
    ensureAuthenticated : function(req, res, next) {
        // isAuthenticated exists in passport
        if(req.isAuthenticated()){
            return next();
        }
        req.flash({error_msg: "Can Access, Unless you're logged in"});
        res.redirect("/users/login");
    }
}