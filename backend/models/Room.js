const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Room", roomSchema);
