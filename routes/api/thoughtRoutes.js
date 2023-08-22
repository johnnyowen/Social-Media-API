// imports Router object from express library so we can define and manage routes
const router = require("express").Router();
// importing each function individually for use
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// setting the final endpoint '/api/thoughts/'
router.route("/").get(getAllThoughts).post(createThought);

// setting the final endpoint '/api/thoughts/:thoughtId'
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// setting the final endpoint '/api/thoughts/:thoughtId/reactions'
router.route("/:thoughtId/reactions").post(addReaction);
// setting the final endpoint '/api/thoughts/:thoughtId/reactions/:reactionId'
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// exporting the router object so we can use it in other files
module.exports = router;
