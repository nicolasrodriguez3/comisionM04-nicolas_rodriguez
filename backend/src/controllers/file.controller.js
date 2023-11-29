const uploadFile = (req, res) => {
	if (!req.files) {
		return res.status(500).send({ msg: "file is not found" })
	}
	// accessing the file
	const myFile = req.files.file
	//  mv() method places the file inside public directory
	myFile.mv(`${__dirname}/../uploads/${myFile.name}`, function (err) {
		if (err) {
			console.log(err)
			return res.status(500).send({ msg: "Error occured" })
		}
		// returing the response with file path and name
		return res.send({ name: myFile.name, path: `/${myFile.name}` })
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
	downloadFile,
}
