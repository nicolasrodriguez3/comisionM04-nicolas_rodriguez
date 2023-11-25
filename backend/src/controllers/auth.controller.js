const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user.model")

// Login controller
const loginController = async (req, res) => {
	const { email, password } = req.body
	// Check if user exists
	const user = await User.findOne({ email })
	const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

	if (!(user && passwordCorrect)) {
		return res.status(401).json({ error: "invalid email or password" })
	}

	// Create token
	const userForToken = {
		email: user.email,
		id: user.id,
	}

	const token = jwt.sign(userForToken, process.env.SECRET)

	res.status(200).send({ token, email: user.email, name: user.name })
}

// Register controller
const registerController = async (req, res) => {
	const { name, email, password } = req.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		name,
		email,
		password: passwordHash,
	})
	console.log({ user })
	try {
		// Save user to DB
		const savedUser = await user.save()

		// return saved user
		res.status(201).json(savedUser)
	} catch (error) {
		if (error.code === 11000) {
			// Error de duplicado (clave única)
			res.status(400).json({ error: "El usuario ya existe" })
		} else {
			next(error)
		}
	}
}

module.exports = {
	loginController,
	registerController,
}
