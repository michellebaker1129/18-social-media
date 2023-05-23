const { Thought, User, Reaction } = require("../models");
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

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId,
            },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },

    //use $pull like in the users
    // delete the thought from the user who owns it
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((dbThoughtData) => {
                // find the user who owns the thought
                // delete the thought from their thoughts array
                // delete the thought
                Promise.all([
                    User.findOneAndUpdate(
                        {
                            _id: dbThoughtData.userId,
                        },
                        {
                            $pull: {
                                thoughts: req.params.thoughtId,
                            },
                        }
                    ),
                    Reaction.deleteMany({ thoughtId: req.params.thoughtId }),
                ])
                    .then(([dbUserData, dbReactionData]) => {
                        res.json({ message: "Successfully deleted thought" });
                    })
                    .catch((err) => res.status(500).json(err));
            })
    },

    //match add 
    async addReaction(req, res) { 
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                {
                    _id: req.params.thoughtId
                }, {
                $addToSet: {
                    reactions: req.body
                }
            }, {
                runValidators: true,
                new: true
            });

            return res.json(dbThoughtData);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
        
    //try to send messages when i can 
    // .then
    // .catch

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId,
            },
            {
                $pull: {
                    reactions: {
                        reactionId: req.params.reactionId,
                    },
                },
            },
            {
                runValidators: true,
                new: true,
            }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id" });
                    return;
                }
                res.json({ message: "Successfully deleted the reaction" });
            })
            .catch((err) => res.status(500).json(err));
    },
};
