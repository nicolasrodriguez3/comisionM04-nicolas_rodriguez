const Comment = require("../models/comment.model")
const Post = require("../models/post.model")

// Function to get all comments
const getAllComments = async (req, res) => {
	const { id } = req.params

	// Get comments from database
	const comments = await Comment.find({ postId: id }).populate("userId")

	// Return response to client
	res.json(comments)
}

// Function to create a new comment
const createComment = async (req, res) => {
	const { id } = req.params
	const { user } = req
	const { content } = req.body

	// Create a new comment in the database
	const comment = await Comment.create({
		postId: id,
		userId: user.id,
		content,
		createdAt: Date.now(),
	})

	// Update the comments array in the post
	const post = await Post.findById(id)
	post.comments.push(comment)
	await post.save()

	// Return response to client
	res.status(201).json(comment)
}

// Function to update an existing comment
const updateComment = async (req, res) => {
	try {
		// Extract the necessary data from the request body and parameters
		// Implement the logic to update the comment in the database
		// Return the updated comment as a response
	} catch (error) {
		// Handle any errors and return an error response
	}
}

// Function to delete a comment
const deleteComment = async (req, res) => {
	try {
		// Extract the necessary data from the request parameters
		// Implement the logic to delete the comment from the database
		// Return a success message as a response
	} catch (error) {
		// Handle any errors and return an error response
	}
}

// Export the comment controller functions
module.exports = {
	getAllComments,
	createComment,
	updateComment,
	deleteComment,
}
