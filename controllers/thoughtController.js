const { Thought, User } = require("../models");
module.exports = {
    // get all Thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    {
                        _id: req.body.userId,
                    },
                    {
                        $push: { thoughts: dbThoughtData._id },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) { },

    //use $pull like in the users
    deleteThought(req, res) { },

    //match add 
    addReaction(req, res) { 
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions: req.body}}, {runValidators: true, new:true})
    },
//try to send messages when i can 
.then
.catch

    deleteReaction(req, res) { },
};
