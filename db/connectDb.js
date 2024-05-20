const mongoose = require("mongoose");
require('dotenv').config()

let url = process.env.DATABASE_URL;
exports.connectDb = async () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("DB Connected");
        })
        .catch((error) => {
            console.error("Error connecting to the database:", error);
        });
};
