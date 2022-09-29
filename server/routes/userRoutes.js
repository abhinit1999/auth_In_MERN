const express = require("express")
const router = express.Router();
const UserController = require("../controllers/userController")
const checkUserAuth = require("../midlewares/auth_middleware");


// Route Level Middleware - to protect Route

router.use("/changepassword",checkUserAuth)
router.use("/loggeduser",checkUserAuth)


// public Routes
router.post("/register",UserController.userRegistration)
router.post("/login",UserController.userLogin)
router.post("/send-reset-password-email",UserController.sendUserPasswordResetEmail)
router.post("/reset/password/:id/:token",UserController.userPasswrodReset)


// protected Routes
router.post("/changepassword",UserController.changeUserPassword)
router.get("/loggeduser",UserController.loggedUser)

// Display All User Data
router.get("/users",UserController.allUser)



module.exports = router;