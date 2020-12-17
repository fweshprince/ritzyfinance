const router = require("express").Router();
const {
  index,
  register,
  manageusers,
  editUser,
  createTransaction,

} = require("../controllers/admin");

router.route("/").get(index);
router.route("/:id").get(manageusers);
router.route("/index").get(index);
router.route("/register").post(register);
router.route("/edit").post(editUser);
router.route("/transaction").post(createTransaction);


module.exports = router;
