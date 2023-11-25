const User = require("../models/user.model")

const userController = {
	// Get all users
	getUsers: async (req, res) => {
		const users = await User.find({})
		res.json(users)
	},

	// Create a new user
	createUser: async (req, res, next) => {
		const { name, email, password } = req.body

		try {
			const user = await User.create({ name, email, password })

			res.status(201).json(user)
			console.log(user)
		} catch (error) {
			if (error.code === 11000) {
				// Error de duplicado (clave única)
				res.status(400).json({ error: "El usuario ya existe" })
			} else if (error.name === "ValidationError") {
				res.status(400).json({ error: error.message })
			} else {
				next(error)
			}
		}
	},
}

module.exports = userController
