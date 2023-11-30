const User = require("../models/user.model")

// Get all users
const getUsers = async (req, res) => {
	const users = await User.find({})
	res.json(users)
}

const getMyProfile = async (req, res) => {
	const { user } = req
	if (!user) {
		return res.status(401).json({ error: "invalid token" })
	}

	res.json(user)
}

module.exports = {
	getUsers,
	getMyProfile,
}
