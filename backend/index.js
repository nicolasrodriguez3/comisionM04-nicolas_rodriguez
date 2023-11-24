const config = require("./src/utils/config")

const app = require("./src/app") // la aplicación Express real
const http = require("http")
const PORT = config.PORT

const server = http.createServer(app)

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
