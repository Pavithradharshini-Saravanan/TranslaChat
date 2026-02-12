// In backend/controllers/MessageController.js

const Message = require("../models/Message");
const User = require("../models/User");
const { translateText } = require("../translate");

// ⬅️ CRITICAL: Placeholder for the io instance
let io;

// ⬅️ CRITICAL: Setter function to receive the initialized io instance from app.js
exports.setIo = (ioInstance) => {
    io = ioInstance;
};

exports.sendMessage = async (req, res) => {
    try {
        const { sender, text, roomId } = req.body;

        if (!sender || !text || !roomId) {
            return res.status(400).json({ message: "Sender ID, text, and roomId are required." });
        }

        // 1. Fetch the room to get participants
        const Room = require("../models/Room");
        const room = await Room.findById(roomId).populate("participants");

        if (!room) {
            return res.status(404).json({ message: "Room not found." });
        }

        // 2. Get only the users in this room
        const roomUsers = room.participants;

        // Find the sender's details
        const senderUser = roomUsers.find(u => u._id.toString() === sender);
        const originalLanguage = senderUser ? senderUser.preferredLanguage : 'en';

        // 3. Prepare the translations map for room participants only
        const translations = {};
        translations[originalLanguage] = text;

        // 4. Iterate over room users and generate translations
        for (const user of roomUsers) {
            const targetLang = user.preferredLanguage;

            if (translations[targetLang]) continue;

            try {
                const translatedText = await translateText(text, targetLang, originalLanguage);
                translations[targetLang] = translatedText;
            } catch (err) {
                console.error(`Translation failed for language ${targetLang}. Using original text.`, err.message);
                translations[targetLang] = text;
            }
        }

        // 5. Save the new message with all translations and roomId
        const newMessage = new Message({
            sender,
            text,
            translations,
            roomId,
        });

        let savedMessage = await newMessage.save();

        // 6. Populate sender details for the broadcast
        savedMessage = await savedMessage.populate('sender', 'username preferredLanguage');

        // 7. Broadcast the message ONLY to the specific room
        if (io) {
            io.to(roomId).emit("receiveMessage", savedMessage);
        } else {
            console.warn("Socket.IO instance not available for broadcast. Check app.js.");
        }

        // 8. Respond to the sender's HTTP request
        res.status(201).json(savedMessage);

    } catch (error) {
        console.error("CRITICAL ERROR in sendMessage controller:", error);
        res.status(500).json({
            message: "Failed to send message due to a server error. Check the backend console.",
            details: error.message
        });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { roomId } = req.query;

        if (!roomId) {
            return res.status(400).json({ error: "roomId is required." });
        }

        const messages = await Message.find({ roomId })
            .populate("sender", "username preferredLanguage")
            .sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Failed to retrieve messages." });
    }
};