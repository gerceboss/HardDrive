const express = require("express");
const router = express.Router();
const fileController = require("./../controllers/fileController");

router.get("/:addr/:filename", fileController.getFile);
router.post("/:addr/uploadFile", fileController.createFile);
module.exports = router;
