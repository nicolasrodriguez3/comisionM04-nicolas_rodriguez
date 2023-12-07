const Post = require("../models/post.model")

const getAllPosts = async (req, res) => {
	// Get posts from database
	const posts = await Post.find({})
		.populate({
			path: "comments",
			populate: {
				path: "userId",
				select: "name email imageUrl",
			},
			select: {
				__v: 0,
				postId: 0,
			},
		})
		.populate("createdBy", "name email imageUrl")
		.populate("likes", "name")

	// Return response to client
	res.json(posts)
}

const getPostById = async (req, res) => {
	const { id } = req.params

	// Get post from database if the user is logged
	// const post = await Post.findById(id).populate(["createdBy", "comments"])
	const post = await Post.findById(id)
		.populate({
			path: "comments",
			populate: {
				path: "userId",
				select: "name email imageUrl",
			},
			select: {
				__v: 0,
				postId: 0,
			},
		})
		.populate("createdBy", "name email imageUrl")
		.populate("likes", "name")

	// Return response to client
	res.json(post)
}

const createPost = async (req, res) => {
	const { title, description, imageUrl, location } = req.body
	const { user } = req

	// Create a new post in the database
	const date = Date.now()
	const post = await Post.create({
		title,
		description,
		imageUrl,
		location,
		createdBy: user.id,
		createdAt: date,
		modifiedAt: date,
	})

	// Add post to user's posts
	user.posts.push(post.id)
	await user.save()

	// Return response to client
	res.status(201).json(post)
}

const updatePost = async (req, res) => {
	const { id } = req.params
	const { title, description, imageUrl, location } = req.body
	const { user } = req

	const postToUpdate = await Post.findById(id)
	if (!postToUpdate) {
		res.status(404).json({ message: "Post not found" })
		return
	}
	if (postToUpdate.createdBy.toString() !== user.id) {
		res.status(403).json({ message: "User not allowed" })
		return
	}

	// Logic to update a post by its ID
	const post = await Post.findByIdAndUpdate(
		id,
		{
			title,
			description,
			imageUrl,
			location,
			modifiedAt: Date.now(),
		},
		{ new: true }
	)
		.populate({
			path: "comments",
			populate: {
				path: "userId",
				select: "name email imageUrl",
			},
		})
		.populate("createdBy", "name email")

	// Return response to client
	res.json(post)
}

const deletePost = async (req, res) => {
	const { id } = req.params

	const postToDelete = await Post.findById(id)
	if (!postToDelete) {
		res.status(404).json({ message: "Post not found" })
		return
	}
	if (postToDelete.createdBy.toString() !== req.user.id) {
		res.status(403).json({ message: "User not allowed" })
		return
	}

	// Logic to delete a post by its ID
	await Post.findByIdAndDelete(id)

	// Return response to client
	res.status(204).json()
}

// Export the controller functions
module.exports = {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
}
