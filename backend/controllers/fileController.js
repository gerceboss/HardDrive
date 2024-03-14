const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const File = require("./../models/fileModel");
const User = require("../models/userModel");
const contract = require("./../fetch");
//this will be used to display the file
exports.getFile = catchAsync(async (req, res, next) => {
  const { addr, filename } = req.params;
  const show = await contract.methods
    .displayFile()
    .call({ _addr: `${addr}`, _file: `${filename}` });
  const user = await User.findOne({ address: addr });
  if (!user) {
    return AppError("you are not a registered user here", 404);
  }
  if (show) {
    return AppError("You are not allowed to view the file", 404);
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

//file uploaded
exports.createFile = catchAsync(async (req, res, next) => {
  const { name, description, ipfsHash, size, address } = req.body;
  const user = await User.findOne({ address: address });
  const id = user._id;
  const fileUploaded = await File.create({
    name,
    description,
    ipfsHash,
    size,
    owner: id,
  });
  const result = await contract.methods
    .uploadFile(name)
    .call({ from: `${address}` });
  console.log(result);
  //file transaction happened;

  if (fileUploaded) {
    res.status(200).json({
      status: "success",
      data: fileUploaded,
    });
  } else {
    return AppError("file not uploaded", 404);
  }
});
