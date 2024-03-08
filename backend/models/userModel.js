const mongoose = require("mongoose");
const validator = require("validator");
const { isAddress } = require("web3-validator");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: false,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    address: {
      type: String,
      unique: true,
      required: [true, "Please give your wallet address"],
      validate: [
        isAddress(this.address),
        "Please provide a valid wallet address",
      ],
    },
    files: {
      type: [mongoose.Schema.ObjectId],
      ref: "File",
      default: [],
    },
    folders: {
      type: [mongoose.Schema.ObjectId],
      ref: "Folder",
      default: [],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
