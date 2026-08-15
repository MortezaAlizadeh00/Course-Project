const coursesModel = require("./../models/course")
const { validationResult } = require("express-validator");
const Cart = require("../models/cart");
const multer = require("multer");



const renderIndex = async (req, res, errors = []) => {
    const courses = await coursesModel.find({});

    return res.render("index", {
        courses,
        titlePage: "Courses Page",
        errors,
        user: req.session.user
    });
};

exports.create = async (req,res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
        
            errors.array().forEach(error => {
              req.flash("error",error.msg)
            });

            return res.redirect("/courses")
        }
        

        const {title , price , teacherName } = req.body

        await coursesModel.create({title , price , teacherName, image: req.file.filename})

        req.flash("success", "دوره با موفقیت ایجاد شد.");

        return res.redirect("/courses");

    } catch (error) {
        console.error(error);

        req.flash("error", "خطایی در سرور رخ داد.");

        return res.redirect("/courses");
    }
    
}

exports.getAll = async (req,res) => {
        return renderIndex(req, res);
}


exports.remove = async (req,res) => {
    try {
        const {id} = req.params
        await Cart.deleteMany({
            course: id
        });

        await coursesModel.findByIdAndDelete(id);
        req.flash("success", "دوره با موفقیت حذف شد.");
        res.redirect("/courses")
    } catch (error) {
        return res.status(500).json({message : "Oops , unknown server error"})
    }
}

exports.edit = async (req,res) => {
        try {

        const { id } = req.params;
        const { title, price, teacherName } = req.body;

        const updateData = {
            title,
            price,
            teacherName
        };

            if (req.file) {
            updateData.image = req.file.filename;
        }
        await coursesModel.findByIdAndUpdate(id, updateData);
        req.flash("success", "دوره با موفقیت ویرایش شد.");
        return res.redirect("/courses");

    } catch (error) {

        console.log(error);
        req.flash("error", "خطایی رخ داد.");
        res.redirect("/courses");

    }
    
}

exports.search = async (req, res) => {
    try {

        const { title } = req.query;

        const courses = await coursesModel.find({
            title: {
                $regex: title,
                $options: "i"
            }
        });

        return res.json(courses);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }
};

