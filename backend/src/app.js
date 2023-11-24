const express = require("express")
const cors = require("cors")
require("express-async-errors")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const middleware = require("./utils/middleware")
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(fileUpload())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// Routes
app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
