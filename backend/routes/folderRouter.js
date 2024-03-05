const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router.get("/:addr", userController.getUser); //get the user by his/her addr or email
