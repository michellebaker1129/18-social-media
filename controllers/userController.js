const { trusted } = require("mongoose");
const { User, Thought } = require("../models");
module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate("thoughts")
            .populate("friends")
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //TODO can successfully get user, fails ot trigger error for incorrect ID
    async getSingleUser(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.userId })
                .populate("thoughts")
                .populate("friends");
            if (!dbUserData) {
                return res.status(500).json({ message: "no user found with that ID" });
            }
            res.json(dbUserData);
        } catch (err) {
            res.json(err);
        }
    },

    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } }
        )
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } }
        )
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },
};
