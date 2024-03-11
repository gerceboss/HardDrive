const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "New File", //new name is new folder by default
  },
  description: {
    type: String,
    default: "",
  },
  ipfsHash: {
    type: String,
    required: [true, "give the hash of the stored file please"],
  },
  size: {
    type: Number,
    required: [true, "size batao sir"],
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "No user is owner yet"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  //path where it is stored in the drive from the global starting point
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
