const mongoose = require("mongoose");

const config = require("config");
const ENVIRONMENT = config.get("ENVIRONMENT");

require("dotenv").config();
const connectionStringForAtlas = process.env.ATLAS_CONNECTION_STRING;

const connectToDb = async () => {
    if (ENVIRONMENT === "development") {
        await connectToLocalDb();
    }
    if (ENVIRONMENT === "production") {
        await connectToAtlasDb();
    }
};


const connectToLocalDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/yarnsServer");
        console.log("Connected to MongoDB locally");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
};



const connectToAtlasDb = async () => {
    try {
        await mongoose.connect(connectionStringForAtlas);
        console.log("Connected to MongoDB in atlas");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
};

module.exports = { connectToDb };