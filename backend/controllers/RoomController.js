const Room = require("../models/Room");
const { customAlphabet } = require("nanoid");

// Generate readable room codes like "abc-xyz-123"
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

exports.createRoom = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required to create a room." });
        }

        // Generate unique room code
        const roomCode = nanoid();

        const newRoom = new Room({
            roomCode,
            createdBy: userId,
            participants: [userId]
        });

        await newRoom.save();

        res.status(201).json(newRoom);
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ message: "Failed to create room.", details: error.message });
    }
};

exports.getRoomInfo = async (req, res) => {
    try {
        const { roomCode } = req.params;

        const room = await Room.findOne({ roomCode })
            .populate("createdBy", "username preferredLanguage")
            .populate("participants", "username preferredLanguage");

        if (!room) {
            return res.status(404).json({ message: "Room not found." });
        }

        res.json(room);
    } catch (error) {
        console.error("Error fetching room info:", error);
        res.status(500).json({ message: "Failed to fetch room info.", details: error.message });
    }
};

exports.joinRoom = async (req, res) => {
    try {
        const { roomCode } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required to join a room." });
        }

        const room = await Room.findOne({ roomCode });

        if (!room) {
            return res.status(404).json({ message: "Room not found." });
        }

        // Add user to participants if not already in the room
        if (!room.participants.includes(userId)) {
            room.participants.push(userId);
            await room.save();
        }

        const populatedRoom = await Room.findOne({ roomCode })
            .populate("createdBy", "username preferredLanguage")
            .populate("participants", "username preferredLanguage");

        res.json(populatedRoom);
    } catch (error) {
        console.error("Error joining room:", error);
        res.status(500).json({ message: "Failed to join room.", details: error.message });
    }
};
