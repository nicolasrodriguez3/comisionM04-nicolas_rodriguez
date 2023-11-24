const router = require("express").Router()

// Controller
const UserController = require("../controllers/user.controller")

// Routes
router.get("/", UserController.getUsers)
//* router.get("/:id", UserController.getUserById)
router.post("/", UserController.createUser)
//* router.put("/:id", UserController.updateUser)
//* router.delete("/:id", UserController.deleteUser)

module.exports = router