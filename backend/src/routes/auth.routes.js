const router = require("express").Router()

// Controller
const authController = require("../controllers/auth.controller")

// Routes
router.post("/register", authController.registerController)
router.post("/login", authController.loginController)

module.exports = router
