const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router.post("/createUser", userController.createUser);
router.get("/:addr", userController.getUser);
router.get("/:addr/myFiles", userController.getAllFiles);
router.get("/:addr/folders", userController.getAllFolders);
router.patch("/:addr/giveAccess", userController.giveAccess);
router.patch("/:addr/blockAccess", userController.blockAccess);
module.exports = router;
