const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    // The original, untranslated text
    text: {
        type: String,
        required: true,
    },
    // CRITICAL: Map for storing { language_code: translation_string } pairs
    translations: {
        type: Map,
        of: String, 
        default: {},
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Message", messageSchema);