const router = require("express").Router()
const PostController = require("../controllers/post.controller")

// GET all posts
router.get("/", PostController.getAllPosts)

// GET a specific post
router.get("/:id", PostController.getPostById)

// POST a new post
router.post("/", PostController.createPost)

// PUT update a post
router.put("/:id", PostController.updatePost)

// DELETE a post
router.delete("/:id", PostController.deletePost)

module.exports = router
