const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URI;

if (!dbUrl) {
    console.log("MONGO_URI is not defined");
    process.exit(1);
}

mongoose
    .connect(dbUrl)
    .then(() => {
        console.log("Server connected to Db");
    })
    .catch((err) => {
        console.log("MongoDB connection error ->", err.message);
    });