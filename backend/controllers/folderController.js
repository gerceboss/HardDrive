const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Folder = require("./../models/folderModel");
const User = require("../models/userModel");
const File = require("./../models/fileModel");
exports.getFolder = catchAsync(async (req, res, next) => {
  // get the folder if given address  has the access of the following folder or file
});
exports.createFolder = catchAsync(async (req, res, next) => {
  const folderName = req.body.folderName;
  let parentFoldername = req.body.parentFoldername;
  if (!parentFoldername) {
    parentFoldername = "";
  }
  const owner_addr = req.body.address;
  const owner = await User.findOne({ address: owner_addr });

  const existing_folders = await Folder.find({});
  const folder_number = existing_folders.length;
  console.log(parentFoldername, folderName, owner_addr);
  let folder;
  //say frontend manages the id and sends here
  if (parentFoldername === "" && folderName !== "") {
    folder = await Folder.create({ name: folderName, owner: owner });
    const prev_folders = owner.folders;
    prev_folders.push(folder);
    const newOwner = await User.updateOne(
      {
        _id: owner._id,
      },
      {
        folders: prev_folders,
      }
    );
  } else if (parentFoldername === "" && folderName === "") {
    folder = await Folder.create({
      name: `folder-${folder_number}`,
      owner: owner,
    });
    const prev_folders = owner.folders;
    prev_folders.push(folder);
    const newOwner = await User.updateOne(
      {
        _id: owner._id,
      },
      {
        folders: prev_folders,
      }
    );
  } else if (parentFoldername !== "" && folderName === "") {
    const parent = await Folder.findOne({ name: parentFoldername });
    folder = await Folder.create({
      parentFolder: parent,
      name: `folder-${folder_number}`,
      owner: owner,
    });
    const prev_folders = owner.folders;
    prev_folders.push(folder);
    const newOwner = await User.updateOne(
      {
        _id: owner._id,
      },
      {
        folders: prev_folders,
      }
    );
    const updatedChildren = parent.childFolders;
    updatedChildren.push(folder);
    const newParent = await Folder.updateOne(
      {
        _id: parent._id,
      },
      {
        childFolders: updatedChildren,
      }
    );
  } else {
    const parent = await Folder.findOne({ name: parentFoldername });
    folder = await Folder.create({
      name: folderName,
      parentFolder: parent._id,
      owner: owner,
    });
    const prev_folders = owner.folders;
    prev_folders.push(folder);
    const newOwner = await User.updateOne(
      {
        _id: owner._id,
      },
      {
        folders: prev_folders,
      }
    );
    const updatedChildren = parent.childFolders;
    updatedChildren.push(folder);
    const newParent = await Folder.updateOne(
      {
        _id: parent._id,
      },
      {
        childFolders: updatedChildren,
      }
    );
  }
  res.status(200).json({
    status: "success",
    data: folder,
  });
});

exports.createFileInfolder = catchAsync(async (req, res, next) => {
  console.log("hello");
  const { parentFoldername, name, description, ipfsHash, size, address } = req.body;
  const user = await User.findOne({ address: address });
  const id = user._id;
  const fileUploaded = await File.create({
    name,
    description,
    ipfsHash,
    size,
    owner: id,
  });

  console.log(fileUploaded._id);
  const folder = await Folder.findOne({ name: parentFoldername });
  const files = folder.files;
  let new__files = files;
  new__files.push(fileUploaded._id);
  const updatedfolder = await Folder.findByIdAndUpdate(folder._id, { files: new__files });
  console.log(updatedfolder);
  // const result = await contract.methods
  //   .uploadFile(name)
  //   .call({ from: `${address}` });
  // console.log(result);
  //file transaction happened;

  if (updatedfolder) {
    res.status(200).json({
      status: "success",
      data: updatedfolder,
    });
  } else {
    return new AppError("file not uploaded", 404);
  }
});
