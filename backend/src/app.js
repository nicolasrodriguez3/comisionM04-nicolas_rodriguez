const express = require("express")
require("./config/mongoose.config")
const cors = require("cors")
require("express-async-errors")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const middleware = require("./utils/middleware")
const userRoutes = require("./routes/user.routes")
const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/post.routes")
const fileRoutes = require("./routes/file.routes")
const commentRoutes = require("./routes/comment.routes")
const likeRoutes = require("./routes/like.routes")

const app = express()

// Middlewares
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

app.use("/api", authRoutes)
app.use("/api/files", fileRoutes)
app.use("/api/users", middleware.userExtractor, userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", middleware.userExtractor, commentRoutes)
app.use("/api/like", middleware.userExtractor, likeRoutes)


// Middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
