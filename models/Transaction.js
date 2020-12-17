const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransactionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["Credit", "Debit"],
    },
    description: {
      type: String,
    },
    refNo: {
      type: String,
    },
    date: {
      type: Date,
    },

  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
