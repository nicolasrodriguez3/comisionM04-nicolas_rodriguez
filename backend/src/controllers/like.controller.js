// En tu controlador (controllers/postController.js)
const Post = require("../models/post.model")

const toggleLike = async (req, res) => {
	const { postId } = req.params
	const {user} = req

	// Encuentra el post por ID y verifica si el usuario ya dio like
	const post = await Post.findById(postId)
	console.log(post)

	if (!post) {
		return res.status(404).json({ error: "Post no encontrado" })
	}

	// Verifica si el usuario ya dio like
	const userIndex = post.likes.findIndex((userId) => userId.toString() === user._id.toString())

	if (userIndex !== -1) {
		// Si el usuario ya dio like, quita el like (dislike)
		post.likes.splice(userIndex, 1)
	} else {
		// Si el usuario no ha dado like, agrega el like
		post.likes.push(user._id)
	}

	// Guarda el post actualizado en la base de datos
	await post.save();

	// Vuelve a cargar el post con la información de los usuarios que dieron like
	const updatedPost = await Post.findById(postId).populate('likes', 'name imageUrl');


	res.json(updatedPost)
}

module.exports = { toggleLike }
