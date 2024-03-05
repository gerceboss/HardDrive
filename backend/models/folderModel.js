const mongoose = require("mongoose");
const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "New Folder", //new name is new folder by default
    },
    files: {
      type: [mongoose.Schema.ObjectId],
      ref: "File",
      default: [], //no files inside this folder
    },
    parentFolder: {
      type: mongoose.Schema.ObjectId,
      ref: "Folder",
      default: -1, //global id
    },
    childFolders: {
      type: [mongoose.Schema.ObjectId],
      ref: "Folder",
      default: [], //this shows that it doesnt have any folders inside it
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
