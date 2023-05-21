const {getAllUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend} = require('../../controllers/userController');
const router = require('express').Router();
router.route ("/").get(getAllUsers).post(createUser)
router.route ("/:userId").get(getSingleUser)

module.exports = router;