const express = require("express");
const router = express.Router();
const {createUser, getAllUsers} = require("../controllers/user");

router.post("/create", createUser);
router.get('/all-users/:roomId', getAllUsers);
router.put('/update_role',)

module.exports = router;