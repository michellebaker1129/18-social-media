const { trusted } = require("mongoose");
const { User, Thought } = require("../models");
module.exports = {
    // get all users
    // GET /api/users/
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

    // get one user by id
    // GET /api/users/:userId
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

    // create user
    // POST /api/users/
    // {
    //    "username": "lernantino",
    //    "email": "lernantino@gmail"
    // }
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // update user by id
    // PUT /api/users/:userId
    // {
    //    "username": "lernantino",
    //    "email": "lernantino@gmail"
    // }
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

    // delete user
    // DELETE /api/users/:userId
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // add friend
    // POST /api/users/:userId/friends/:friendId
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // remove friend
    // DELETE /api/users/:userId/friends/:friendId
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },
};
