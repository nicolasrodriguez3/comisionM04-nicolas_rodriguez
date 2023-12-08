const { toggleLike } = require("../controllers/like.controller")

const router = require("express").Router()

// Add or remove like
router.post("/:postId", toggleLike)

module.exports = router
