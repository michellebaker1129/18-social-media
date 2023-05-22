const {getAllUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend} = require('../../controllers/userController');
const router = require('express').Router();

router.route ("/").get(getAllUsers).post(createUser)
router.route ("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser)
router.route ("/:userId/friends/:friendId").post(addFriend).put(deleteFriend)

module.exports = router;