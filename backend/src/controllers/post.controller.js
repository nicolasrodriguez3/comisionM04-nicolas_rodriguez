const Post = require("../models/post.model")

const getAllPosts = async (req, res) => {
	// Get posts from database
	const posts = await Post.find({}).populate("createdBy")
	//* si quisiera enviar solo una parte del usuario, puedo hacerlo con el segundo parámetro de populate: (populate("createdBy", "name email"))

	// Return response to client
	res.json(posts)
}

const getPostById = async (req, res) => {
	const { id } = req.params

	// Get post from database if the user is logged
	const post = await Post.findById(id).populate("createdBy")

	// Return response to client
	res.json(post)
}

const createPost = async (req, res) => {
	const { title, description, imageUrl, location } = req.body
	const { user } = req

	// Create a new post in the database
	const post = await Post.create({
		title,
		description,
		imageUrl,
		location,
		createdBy: user.id,
		createdAt: Date.now(),
	})

	// Return response to client
	res.status(201).json(post)
}

const updatePost = (req, res) => {
	// Logic to update a post by its ID based on the request body
	// Update the post in the database
	// Return the updated post as a response
}

const deletePost = (req, res) => {
	// Logic to delete a post by its ID
	// Remove the post from the database
	// Return a success message as a response
}

// Export the controller functions
module.exports = {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
}
