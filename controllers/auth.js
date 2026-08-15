const User = require("../models/user");
const bcrypt = require("bcrypt");
const signupSchema = require("../validators/auth");

exports.showSignup = (req,res)=>{
    res.render("signup",{
        errors: []
        
    });
}

exports.signup = async (req,res)=>{

    try{
        const { error } = signupSchema.validate(req.body, {
            abortEarly: false
        });

        if (error) {

            return res.render("signup", {
                errors: error.details
            });

        }
        const {username,password} = req.body;

        const isExist = await User.findOne({username});

        if(isExist){
            return res.render("signup",{
                errors:[{message : "این نام کاربری قبلاً ثبت شده است."}]
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        await User.create({
            username,
            password:hashPassword,
            role:"USER"
        })

        res.redirect("/login");

    }catch(err){

        console.log(err);

        res.status(500).send("Server Error");

    }

}

exports.showLogin=(req,res)=>{
    res.render("login");
}

exports.login = async (req,res)=>{

    const {username,password}=req.body;

    const user = await User.findOne({username});

    if(!user){

        return res.render("login",{
            error:"کاربر یافت نشد"
        })

    }

    const isValid = await bcrypt.compare(password,user.password);

    if(!isValid){

        return res.render("login",{
            error:"رمز عبور اشتباه است"
        })

    }

    req.session.user = {

        id:user._id,
        username:user.username,
        role:user.role

    }

    res.redirect("/courses");

}

exports.logout=(req,res)=>{

    req.session.destroy(()=>{

        res.redirect("/login");

    })

}