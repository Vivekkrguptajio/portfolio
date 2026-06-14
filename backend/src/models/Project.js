const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL to the image
        required: true
    },
    techStack: {
        type: [String], // Array of strings
        required: true
    },
    liveLink: {
        type: String,
        required: false
    },
    githubLink: {
        type: String,
        required: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
