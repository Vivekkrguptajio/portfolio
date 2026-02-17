const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: './src/.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.originalUrl}`);
    next();
});

// Root Route (Health Check)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});

const upload = multer({ storage: storage });

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
const Project = require('./models/Project');

// GET all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ isFeatured: -1, createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new project
app.post('/api/projects', upload.single('imageFile'), async (req, res) => {
    try {
        const { title, description, image, techStack, liveLink, githubLink, isFeatured } = req.body;

        // Determine image source: uploaded file or URL string
        let projectImage = image;
        if (req.file) {
            // Construct URL for uploaded file
            projectImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        // Validation
        if (!title || !description || !projectImage || !techStack) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newProject = new Project({
            title,
            description,
            image: projectImage,
            techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(item => item.trim()),
            liveLink,
            githubLink,
            isFeatured: isFeatured === 'true' || isFeatured === true
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Optionally delete image file if it exists in uploads/
        if (project.image && project.image.includes('/uploads/')) {
            const filename = project.image.split('/uploads/')[1];
            // path.join('uploads', filename) resolves relative to process.cwd() (backend root)
            const fsPath = path.join('uploads', filename);
            if (fs.existsSync(fsPath)) {
                fs.unlinkSync(fsPath);
            }
        }

        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE a project
app.put('/api/projects/:id', upload.single('imageFile'), async (req, res) => {
    try {
        const { title, description, image, techStack, liveLink, githubLink, isFeatured } = req.body;
        let projectImage = image;

        if (req.file) {
            projectImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        // Prepare update object
        const updateData = {
            title,
            description,
            techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(item => item.trim()),
            liveLink,
            githubLink,
            isFeatured: isFeatured === 'true' || isFeatured === true
        };

        // Only update image if new one provided or if user explicitly sent a URL
        if (projectImage) {
            updateData.image = projectImage;
        }

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });

        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
