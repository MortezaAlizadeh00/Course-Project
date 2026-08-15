const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }

});

module.exports = mongoose.model("Cart", cartSchema);