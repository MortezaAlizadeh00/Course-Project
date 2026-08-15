const { body } = require("express-validator");
const coursesModel = require("../models/course");

const courseValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters")
        .custom(async (value) => {

            const course = await coursesModel.findOne({
                title : value
            });
            if(course){
                throw new Error("Course already exists")
            }
            return true
        })
    ,
    body("price")
        .trim()
        .notEmpty()
        .withMessage("Price is required")
    ,    
    body("teacherName")
        .trim()
        .notEmpty()
        .withMessage("Teacher Name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Teacher Name must be between 3 and 100 characters")
        ,
    (req, res, next) => {

       if (req.method === "POST" && !req.file) {
            req.flash("error", "تصویر دوره الزامی است.");
            return res.redirect("/courses");
}
        next();

    }

];

module.exports = courseValidator;