const router = require("express").Router()
const commentController = require("../controllers/comment.controller")

// GET all comments
router.get("/", commentController.getAllComments)

// POST a new comment
router.post("/:id", commentController.createComment)

// PUT/UPDATE an existing comment
router.put("/:id", (req, res) => {
	// Logic to update an existing comment
})

// DELETE a comment
router.delete("/:id", (req, res) => {
	// Logic to delete a comment
})

module.exports = router
