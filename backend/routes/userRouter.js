const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router.get("/:addr", userController.getUser);
router.get("/:addr/myFiles", userController.getAllFiles);
router.post("/uploadFile", userController.uploadFile); // consider the the file and its content come in req.body and decide its format
