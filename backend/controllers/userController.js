const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");
const contract = require("./../fetch");
const File = require("./../models/fileModel");

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, address } = req.body;

  const user = await User.create({
    name: name,
    email: email,
    address: address,
  });

  if (user) {
    res.status(200).json({
      status: "success",
      data: user,
    });
  } else {
    return AppError("user not created", 404);
  }
});
exports.getUser = catchAsync(async (req, res, next) => {
  const { addr } = req.params;
  const user = await User.findOne({ address: addr });
  if (!user) {
    return;
  } else {
    res.status(200).json({
      status: "success",
      data: user,
    });
  }
});
//doubts
exports.getAllFiles = catchAsync(async (req, res, next) => {
  const { addr } = req.params;
  const user = await User.findOne({ address: addr });
  if (!user) {
    return AppError("No such user exists", 404);
  }
  //fetch the hashes from the on-chain contract
  const fileHashesChain = await contract.methods
    .getMyFiles()
    .call({ from: `${addr}` }); // get all the files user has access to

  const fileHashes = await File.find({ owner: user._id });
  res.status(200).json({
    status: "success",
    data: fileHashes,
  });
});
exports.getAllFolders = catchAsync(async (req, res, next) => {
  const addr = req.params.addr;
  const user = await User.findOne({ address: addr }).populate("folders");
  const folders_ = user.folders;
  const folders = [];
  for (let i in folders_) {
    const folder = await folders_[i].populate(["childFolders", "files"]);
    folders.push(folder);
  }
  console.log(folders);
  res.status(200).json({
    status: "success",
    data: folders,
  });
});

exports.giveAccess = catchAsync(async (req, res, next) => {
  const { addr } = req.params;
  const accessAddress = req.body.accessAddress;
  const filename = req.body.filename;
  const str = await contract.methods
    .giveAccessTo()
    .call({ from: `${addr}`, _addr: `${accessAddress}`, _file: `${filename}` });

  if (str === "Access Given") {
    res.status(200).json({
      status: "success",
      data: "done",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: "already",
    });
  }
});

exports.blockAccess = catchAsync(async (req, res, next) => {
  const { addr } = req.params;
  const accessAddress = req.body.accessAddress;
  const filename = req.body.filename;
  const str = await contract.methods
    .blockAccessOf()
    .call({ from: `${addr}`, _addr: `${accessAddress}`, _file: `${filename}` });

  if (str === "Blocked") {
    res.status(200).json({
      status: "success",
      data: "done",
    });
  } else if (str === "Already Blocked") {
    res.status(200).json({
      status: "success",
      data: "already",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: "Never given access",
    });
  }
});
