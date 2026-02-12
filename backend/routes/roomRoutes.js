const express = require("express");
const router = express.Router();
const roomController = require("../controllers/RoomController");

// Create a new room
router.post("/create", roomController.createRoom);

// Get room information by room code
router.get("/:roomCode", roomController.getRoomInfo);

// Join a room
router.post("/:roomCode/join", roomController.joinRoom);

module.exports = router;
