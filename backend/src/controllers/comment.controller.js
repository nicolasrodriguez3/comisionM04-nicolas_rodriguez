const Comment = require("../models/comment.model")
const Post = require("../models/post.model")

// Function to get all comments
const getAllComments = async (req, res) => {
	const { postId } = req.params

	// Get comments from database
	const comments = await Comment.find({ postId }).populate("userId")

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
	const { id } = req.params
	const { user } = req

	// Create a new comment in the database
	const commentToDelete = await Comment.findById(id)
	console.log({commentToDelete})

	if (!commentToDelete) {
		res.status(404).json({ message: "Comment not found" })
		return
	}
	if (commentToDelete.userId.toString() !== user.id) {
		res.status(403).json({ message: "User not allowed" })
		return
	}
	// Post al que pertenece el comentario
	const post = await Post.findById(commentToDelete.postId)

	// Elimina el comentario del array de comentarios del post
	post.comments = post.comments.filter((commentId) => commentId.toString() !== id)

	// Guarda el post actualizado en la base de datos
	await post.save()

	// Eliminar comentario
	await Comment.findByIdAndDelete(id)

	// Return response to client
	res.status(204).json()
}

// Export the comment controller functions
module.exports = {
	getAllComments,
	createComment,
	updateComment,
	deleteComment,
}
