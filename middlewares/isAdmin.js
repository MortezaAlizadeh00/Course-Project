module.exports = (req,res,next)=>{

    if(req.session.user.role !== "ADMIN"){

        return res.redirect("/courses");

    }

    next();

}