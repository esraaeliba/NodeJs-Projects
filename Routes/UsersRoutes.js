const express = require("express");
const router = new express.Router();
const UserController = require("../Controllers/UsersController");


router.post("/signup", UserController.Register);
router.post("/login", UserController.Login);

module.exports = router;