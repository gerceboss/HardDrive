const express = require("express");
const router = express.Router();
const folderController = require("./../controllers/folderController");

router.get("/:addr", folderController.getFolder); //get the user by his/her addr or email
router.post("/createFolder", folderController.createFolder);
router.patch("/:addr/updatefolder", folderController.createFileInfolder);
module.exports = router;
