const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [
            "admin", 
            "user", 
            "guest", 
            "developer"
        ],
        default: "guest"
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Course', courseSchema);

