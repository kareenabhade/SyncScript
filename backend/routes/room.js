const express = require("express");
const router = express.Router();
const {createRoom, joinRoom} = require("../controllers/room")

router.post("/create", createRoom);
router.post("/join", joinRoom);

module.exports = router;