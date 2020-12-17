const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TranferSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    paymentAmount: {
      type: Number,
    },
    receiverBank: {
      type: String,
    },
    receiverName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    routingNumber: {
      type: String,
    },
    transferOption: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: new Date()
    },

  },
  { timestamps: true }
);

const Transfer = mongoose.model("Transfer", TranferSchema);

module.exports = Transfer;
