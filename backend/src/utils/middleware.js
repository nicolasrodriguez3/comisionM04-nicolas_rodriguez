const jwt = require("jsonwebtoken")
const getTokenFrom = require("./getTokenFrom")

const requestLogger = (request, response, next) => {
	if (process.env.NODE_ENV === "test") {
		return next()
	}
	console.log("Method:", request.method)
	console.log("Path:  ", request.path)

	if (request.body && Object.keys(request.body).length > 0) {
		console.table({
			"Body:": request.body,
		})
	}
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	} else if (error.name === "JsonWebTokenError") {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

const tokenExtractor = (request, response, next) => {
	request.token = getTokenFrom(request)
	next()
}

/* TODO no anda */
const protectedRoute = (request, response, next) => {
	const { token } = request
	console.log("token", token)
	const decodedToken = jwt.verify(token, process.env.SECRET)

	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" })
	}

	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	protectedRoute
}
