const User = require("../models/user.model")

// Get all users
const getUsers = async (req, res) => {
	const users = await User.find({})
	res.json(users)
}

module.exports = {
	getUsers,
}
