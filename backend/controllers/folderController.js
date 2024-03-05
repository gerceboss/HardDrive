const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Folder = require("./../models/folderModel");
exports.getFolder = catchAsync(async (req, res, next) => {
  // populate the files
});
exports.createFolder = catchAsync(async (req, res, next) => {
  const folderName = req.body.folderName;
  const parentFoldername = req.body.parentFoldername;

  let folder;
  //say frontend manages the id and sends here
  if (parentFoldername === "" && folderName !== "") {
    folder = await Folder.create({ name: folderName });
  } else if (parentFoldername === "" && folderName === "") {
    folder = await Folder.create();
  } else if (parentFoldername !== "" && folderName === "") {
    const parent = await Folder.findOne({ name: parentFoldername });
    folder = await Folder.create({
      parentFolder: parent._id,
    });
    const updatedChildren = parent.childFolders.push(folder._id);
    const newParent = await Folder.updateOne({
      _id: parent._id,
      childFolders: updatedChildren,
    });
  } else {
    const parent = await Folder.findOne({ name: parentFoldername });
    folder = await Folder.create({
      name: folderName,
      parentFolder: parent._id,
    });
    const updatedChildren = parent.childFolders.push(folder._id);
    const newParent = await Folder.updateOne({
      _id: parent._id,
      childFolders: updatedChildren,
    });
  }
  res.status(200).json({
    status: "success",
    data: folder,
  });
});


//future me dekhenge
exports.uploadFolder = catchAsync(async (req, res, next) => {});
