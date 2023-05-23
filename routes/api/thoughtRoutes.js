const router = require("express").Router();

const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts)
router.route("/:thoughtId").get(getSingleThought)
router.route("/").post(createThought)
router.route("/:thoughtId").put(updateThought)
router.route("/:thoughtId").delete(deleteThought)
router.route("/:thoughtId/reactions").post(addReaction)
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction)

module.exports = router;
