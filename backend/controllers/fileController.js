const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const File = require("./../models/fileModel");
const User = require("../models/userModel");

//this will be used to display the file
exports.getFile = catchAsync(async (req, res, next) => {
  const { addr, filename } = req.params;
  const user = await User.findOne({ address: addr });
  if (!user) {
    return AppError("you are not a registered user here", 404);
  }

  const file = await File.findOne({ owner: user._id, name: filename });
  const fileHash = file.ipfsHash;
  if (!file) {
    return AppError("no such file exists", 404);
  }
  res.status(200).json({
    status: "success",
    data: fileHash,
  });
});