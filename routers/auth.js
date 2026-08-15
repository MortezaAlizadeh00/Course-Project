const express = require("express");
const authController = require("../controllers/auth");
const coursesController = require("../controllers/course");

const router = express.Router();

router.get("/", coursesController.getAll);

router.get("/signup", authController.showSignup);
router.post("/signup", authController.signup);

router.get("/login", authController.showLogin);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

module.exports = router;