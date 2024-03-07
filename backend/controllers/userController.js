const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");
const contract = require("./../fetch");
exports.getUser = catchAsync(async (req, res, next) => {
  const { addr } = req.params;
  const user = await User.findOne({ address: addr });
  if (!user) {
    return AppError("No user found", 404);
  } else {
    res.status(200).json({
      status: "success",
      data: user,
    });
  }
});

exports.getAllFiles = catchAsync(async (req, res, next) => {
  const { addr } = req.params;
  const user = await User.findOne({ address: addr });
  const userAddr = user.address;
  //fetch the hashes from the on-chain contract
  const fileHashes = await contract.methods
    .getMyFiles()
    .call({ from: `${userAddr}` });
  //this is the array now fetch them from ipfs and return the fileObjects in an array
  const files = []; //file objects in this using a loop
  for (let i = 0; i < fileHashes.length(); i++) {
    // fetch the file
    // push the file in the files array
  }
  res.status(200).json({
    status: "success",
    data: filesFromPath,
  });
});

exports.uploadFile = catchAsync(async (req, res, next) => {}); // req.body me kya kya aana chahiye?