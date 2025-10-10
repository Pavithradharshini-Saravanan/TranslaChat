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
        const { sender, text } = req.body;
        
        if (!sender || !text) {
            return res.status(400).json({ message: "Sender ID and text are required." });
        }

        // 1. Fetch all registered users to get their preferred languages
        const allUsers = await User.find({});
        
        // Find the sender's details
        const senderUser = allUsers.find(u => u._id.toString() === sender);
        const originalLanguage = senderUser ? senderUser.preferredLanguage : 'en';

        // 2. Prepare the translations map
        const translations = {};
        translations[originalLanguage] = text;

        // 3. Iterate over all users and generate translations
        for (const user of allUsers) {
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

        // 4. Save the new message with all translations
        const newMessage = new Message({
            sender,
            text, 
            translations,
        });

        let savedMessage = await newMessage.save();

        // 5. Populate sender details for the broadcast
        savedMessage = await savedMessage.populate('sender', 'username preferredLanguage');

        // 6. Broadcast the message to all connected clients
        if (io) { // ⬅️ Add a check before emitting
            io.emit("receiveMessage", savedMessage);
        } else {
            console.warn("Socket.IO instance not available for broadcast. Check app.js.");
        }
        
        // 7. Respond to the sender's HTTP request
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
        const messages = await Message.find().populate("sender", "username preferredLanguage").sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Failed to retrieve messages." });
    }
};