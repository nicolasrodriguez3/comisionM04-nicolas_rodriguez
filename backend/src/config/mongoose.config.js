const mongoose = require("mongoose")
const config = require("../utils/config")

// Connection URL for MongoDB Atlas
const uri = config.MONGODB_URI

// Connect to MongoDB Atlas
mongoose
	.connect(uri)
	.then(() => console.log("MongoDB connection established"))
	.catch((err) => console.log(err))
