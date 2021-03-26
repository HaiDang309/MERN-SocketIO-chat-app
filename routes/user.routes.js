const express = require('express');
const router = express.Router();

const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller"); 

router.get("/", userController.getAllUser);

router.get("/message/:id", userController.getUserById);

router.post("/sign-in", authController.signIn);

router.post('/sign-up', authController.signUp);

module.exports = router;
