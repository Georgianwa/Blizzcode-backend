const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [
            "admin", 
            "user", 
            "guest", 
            "developer"
        ],
        default: "guest",
    }, createdAt: { 
        type: Date, 
        default: Date.now, 
        immutable: true 
    }, updatedAt: { 
        type: Date,
        default: Date.now,
        immutable: false,
        set: function() {
            return Date.now();
        }
    }
});

const User = mongoose.model("User", userSchema);