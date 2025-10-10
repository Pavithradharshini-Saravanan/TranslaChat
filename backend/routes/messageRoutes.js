const express = require("express");
const router = express.Router();
// ⬅️ Import the controller with the new logic
const messageController = require("../controllers/MessageController"); 

// POST /api/messages/send - Handles message creation, translation, and broadcast
router.post("/send", messageController.sendMessage);

// GET /api/messages - Handles fetching chat history
router.get("/", messageController.getMessages);

module.exports = router;