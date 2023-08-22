// imports Router object from express library so we can define and manage routes
const router = require("express").Router();
// importing each function individually for use
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// setting the final endpoint 'api/users/'
router.route("/").get(getAllUsers).post(createUser);
// setting the final endpoint 'api/users/:id'
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
// setting the final endpoint 'api/users/:id/friends/:friendId'
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

// exporting the router object for use elsewhere in the application
module.exports = router;
