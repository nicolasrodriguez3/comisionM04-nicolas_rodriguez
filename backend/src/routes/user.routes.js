const router = require("express").Router()

// Controller
const UserController = require("../controllers/user.controller")

// Routes
router.get("/", UserController.getUsers)
router.get("/me", UserController.getMyProfile)
//* router.get("/:id", UserController.getUserById)
//* router.put("/:id", UserController.updateUser)
//* router.delete("/:id", UserController.deleteUser)

module.exports = router
