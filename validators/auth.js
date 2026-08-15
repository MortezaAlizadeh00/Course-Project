const Joi = require("joi");

const signupSchema = Joi.object({

    username: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.empty": "نام کاربری الزامی است.",
            "string.min": "نام کاربری باید حداقل 3 کاراکتر باشد.",
            "string.max": "نام کاربری نباید بیشتر از 20 کاراکتر باشد."
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.empty": "رمز عبور الزامی است.",
            "string.min": "رمز عبور باید حداقل 6 کاراکتر باشد."
        })

});

module.exports = signupSchema;