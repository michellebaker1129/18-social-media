const {
    User, Thought
} = require('../models');
module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find({}).populate('thoughts').then(dbUserData => res.json(dbUserData)).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getSingleUser(req, res) {
        User.findOne({_id:req.params.userId}).populate('thoughts')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(500).json(err);
        })
    },
    createUser(req, res) {
        User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(500).json(err);
        })
    },
    updateUser(req, res) {},
    deleteUser(req, res) {},
    addFriend(req, res) {},
    deleteFriend(req, res) {}
}