const User = require("../models/User");
const Transaction = require("../models/Transaction");
const asyncHandler = require("../middleware/async");

// @desc Renders admin dashboard page
// @access public
exports.index = asyncHandler(async (req, res, next) => {
    const users = await User.find()
    res.render("admin/index", {users});
  });

// @desc Renders single users page
// @access public
exports.manageusers = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    const transactions = await Transaction.find({user: req.params.id})
    res.render("admin/manageusers", {user, transactions})
  });

// @desc Registers a user
// @access public
exports.register = asyncHandler(async (req, res, next) => {
    const {
      fullName,
      email,
      pin,
      username,
      accountBalance,
      accountNumber,
      zip,
      city,
      state,
      address,
      approvedAccount,
      phoneNumber,
      routingNumber
    } = req.body;
    const user = await User.create({
      fullName,
      email,
      pin,
      username,
      accountBalance,
      accountNumber,
      zip,
      city,
      state,
      address,
      approvedAccount,
      phoneNumber,
      routingNumber
    });
    res.redirect("/tarvixxx");
  });

// @desc Edits a user
// @access public
exports.editUser = asyncHandler(async (req, res, next) => {
    const {
      fullName,
      email,
      pin,
      username,
      accountBalance,
      accountNumber,
      zip,
      city,
      state,
      address,
      approvedAccount,
      phoneNumber,
    } = req.body;

    await User.updateOne(
        { _id: req.body.user },
        {
          fullName,
          email,
          pin,
          username,
          accountBalance,
          accountNumber,
          zip,
          city,
          state,
          address,
          approvedAccount,
          phoneNumber,
        }
      );
    res.redirect(`/tarvixxx/${req.body.user}`);
  });

// @desc Creates a new transaction
// @access public
exports.createTransaction = asyncHandler(async (req, res, next) => {
    await Transaction.create(req.body)
    res.redirect(`/tarvixxx/${req.body.user}`);
  });