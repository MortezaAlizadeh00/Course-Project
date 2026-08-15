const express = require('express');
const router = express.Router()
const coursesController = require("./../controllers/course")
const courseValidator = require("../middlewares/courseValidator");
const upload = require("../middlewares/upload");

router.post("/" ,upload.single("image"), courseValidator, coursesController.create)
router.get("/" , coursesController.getAll)
router.get("/remove/:id" , coursesController.remove)
router.post("/edit/:id" ,upload.single("image") , coursesController.edit)
router.get("/search", coursesController.search);

module.exports = router