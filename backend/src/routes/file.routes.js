const router = require("express").Router()

const { uploadFile, downloadFile } = require("../controllers/file.controller")

// Route to upload an image
router.post("/upload", uploadFile)

// Route to get an image
router.get("/:filename", downloadFile)

module.exports = router
