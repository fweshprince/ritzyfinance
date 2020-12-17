const mongoose = require("mongoose");
require("dotenv").config();
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    pin: {
      type: String,
      required: [true, "Please input a password"],
      trim: true,
    },
    accountBalance: {
      type: Number,
    },
    loginCount: {
      type: Number,
      default: 0
    },
    accountNumber: {
      type: Number,
    },
    zip: {
      type: Number,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    address: {
      type: String,
    },
    routingNumber: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    approvedAccount: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please input a valid email"],
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
