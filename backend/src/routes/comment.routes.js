const router = require("express").Router()
const {
	getAllComments,
	createComment,
	deleteComment,
} = require("../controllers/comment.controller")

// GET all comments
router.get("/:postId", getAllComments)

// POST a new comment
router.post("/:id", createComment)

// PUT/UPDATE an existing comment
router.put("/:id", (req, res) => {
	// Logic to update an existing comment
})

// DELETE a comment
router.delete("/:id", deleteComment)

module.exports = router
