const router = require("express").Router()
const PostController = require("../controllers/post.controller")
const { userExtractor } = require("../utils/middleware")

// GET all posts
router.get("/", PostController.getAllPosts)

// GET a specific post
router.get("/:id", PostController.getPostById)

// POST a new post
router.post("/", userExtractor, PostController.createPost)

// PUT update a post
router.put("/:id", userExtractor, PostController.updatePost)

// DELETE a post
router.delete("/:id", userExtractor, PostController.deletePost)

module.exports = router
