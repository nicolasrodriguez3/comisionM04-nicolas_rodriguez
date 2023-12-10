const router = require("express").Router()
const middleware = require("../utils/middleware")

const { uploadFile, uploadProfileImage, downloadFile } = require("../controllers/file.controller")

// Route to upload an image
router.post("/upload", middleware.userExtractor, uploadFile)
router.post("/profile/:id", middleware.userExtractor, uploadProfileImage)

// Route to get an image
router.get("/profile/:filename", downloadFile)
router.get("/:filename", downloadFile)

module.exports = router
