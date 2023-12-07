const User = require("../models/user.model")

const uploadFile = (req, res) => {
	const { user } = req

	if (!req.files) {
		return res.status(500).send({ msg: "file is not found" })
	}
	// accessing the file
	const myFile = req.files.file

	//  mv() method places the file inside public directory
	myFile.mv(`${__dirname}/../uploads/${myFile.name}`, function (err) {
		if (err) {
			console.log(err)
			return res.status(500).send({ msg: "Error occurred" })
		}

		// return the response with file path and name
		return res.send({ name: myFile.name, path: `/${myFile.name}` })
	})
}

const uploadProfileImage = (req, res) => {
	const { id } = req.params
	const { user } = req

	const userId = user._id.toString()
	if (userId !== id) return res.status(401).end()

	if (!req.files) {
		return res.status(500).send({ msg: "file is not found" })
	}
	// accessing the file
	const myFile = req.files.file
	const extension = myFile.name.split(".").pop()
	myFile.name = `${userId}.${extension}`
	console.log(myFile.name)

	//  mv() method places the file inside public directory
	// myFile.mv(`${__dirname}/../uploads/profile/${myFile.name}`, function (err) {
	// 	if (err) {
	// 		console.log(err)
	// 		return res.status(500).send({ msg: "Error occurred" })
	// 	}

	// 	const path = `/profile/${myFile.name}`
	// 	const UserUpdated = await User.findByIdAndUpdate(id, { imageUrl: path }, { new: true })

	// 	// return the response with file path and name
	// 	console.log({ UserUpdated })
	// 	return res.end()
	// })
	myFile
		.mv(`${__dirname}/../uploads/profile/${myFile.name}`)
		.then(async () => {
			const path = `/profile/${myFile.name}`
			const userUpdated = await User.findByIdAndUpdate(id, { imageUrl: path }, { new: true })

			// return the response with file path and name
			return res.json({ path })
		})
		.catch((err) => {
			console.log(err)
			return res.status(500).send({ msg: "Error occurred" })
		})
}

const downloadFile = (req, res) => {
	const filename = req.params.filename
	const imagePath = "uploads/" + filename

	// Return the image file
	res.sendFile(imagePath, { root: __dirname + "/../" })
}

module.exports = {
	uploadFile,
	uploadProfileImage,
	downloadFile,
}
