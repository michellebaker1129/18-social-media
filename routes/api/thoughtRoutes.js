const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");
const router = require("express").Router();
router.route("/").get(getAllThoughts).post(createThought)
router.route("/:thoughtId").get(getSingleThought)

module.exports = router;
