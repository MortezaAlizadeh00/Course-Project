const mongoose = require("mongoose");

const atlasUrl = process.env.MONGO_URI;
const localUrl = "mongodb://127.0.0.1:27017/course-project";

const connectDB = async () => {

    try {

        console.log("Connecting to MongoDB Atlas...");

        await mongoose.connect(atlasUrl, {
            serverSelectionTimeoutMS: 5000
        });

        console.log("Server connected to MongoDB Atlas");

    } catch (error) {

        console.log("MongoDB Atlas connection failed.");
        console.log("Trying to connect to local MongoDB...");

        try {

            await mongoose.connect(localUrl);

            console.log("Server connected to Local MongoDB");

        } catch (localError) {

            console.log(
                "Local MongoDB connection error ->",
                localError.message
            );

        }

    }

};

connectDB();