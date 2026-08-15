const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");

require("dotenv").config();
require("./configs/db");

const coursesRouter = require("./routers/course");
const authRouter = require("./routers/auth");
const cartRouter = require("./routers/cart");

const app = express();

app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/fonts", express.static(path.join(__dirname, "public/fonts")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use("/", authRouter);
app.use("/courses" , coursesRouter)
app.use("/cart", cartRouter);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});