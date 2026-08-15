const { required } = require('joi');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
        price : {
        type : Number,
        required : true,
    },
        teacherName : {
        type : String,
        required : true,
    },
        image : {
        type : String,
        required : true 
        }
})

const model = mongoose.model("Course" , schema)
module.exports = model;