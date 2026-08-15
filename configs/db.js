const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URI;

console.log("Mongo URI exists:", !!dbUrl);

mongoose
    .connect(dbUrl)
    .then(() => {
        console.log("Server connected to Db");
    })
    .catch((err) => {
        console.log("MongoDB connection error ->", err.message);
    });