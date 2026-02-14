// In backend/app.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config");
const { translateText } = require("./translate");
const User = require("./models/User");
const Message = require("./models/Message");

// ⬅️ Import the Message Routes file
const messageRoutes = require("./routes/messageRoutes");
// ⬅️ Import the Room Routes file
const roomRoutes = require("./routes/roomRoutes");
// ⬅️ CRITICAL: Import the controller directly to call the setter function later
const messageController = require("./controllers/MessageController");

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));
app.use(bodyParser.json());

// ----------------- USER ROUTES -----------------
app.post("/api/users/register", async (req, res) => {
    const { username, preferredLanguage } = req.body;
    console.log("Register request received:", req.body);

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    try {
        let user = await User.findOne({ username });
        if (!user) {
            user = new User({ username, preferredLanguage: preferredLanguage || "en" });
            await user.save();
            console.log("New user saved:", user);
        } else {
            console.log("Existing user found:", user);
        }
        res.json(user);
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: err.message });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error("Get users error:", err);
        res.status(500).json({ message: err.message });
    }
});

// ----------------- MESSAGE ROUTES -----------------
// ⬅️ Use the imported router for all /api/messages routes (including /send)
app.use("/api/messages", messageRoutes);

// ----------------- ROOM ROUTES -----------------
app.use("/api/rooms", roomRoutes);


// ----------------- TRANSLATION ROUTE -----------------
app.post("/translate", async (req, res) => {
    const { text, targetLang, sourceLang } = req.body;

    if (!text || !targetLang) {
        return res.status(400).json({ error: "Missing text or targetLang" });
    }

    try {
        const translated = await translateText(text, targetLang, sourceLang || "auto");
        res.json({ translated });
    } catch (error) {
        console.error("Error in /translate:", error);
        res.status(500).json({ error: "Translation failed" });
    }
});

// ----------------- SOCKET.IO SETUP -----------------
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// ⬅️ CRITICAL: Inject the io instance into the controller AFTER it's initialized
messageController.setIo(io);


io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinRoom", ({ roomId, username }) => {
        socket.join(roomId);
        console.log(`User ${username} (${socket.id}) joined room: ${roomId}`);
    });

    socket.on("leaveRoom", ({ roomId, username }) => {
        socket.leave(roomId);
        console.log(`User ${username} (${socket.id}) left room: ${roomId}`);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// ----------------- START SERVER -----------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));