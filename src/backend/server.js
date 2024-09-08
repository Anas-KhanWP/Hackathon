const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve resume files from the 'resume' directory
app.use('/resume', express.static(path.join(__dirname, '../resume')));

// Endpoint to handle saving resumes
app.post('/save-resume', (req, res) => {
    const { username, resumeData } = req.body;
    const filePath = path.join(__dirname, '../resume', `${username}.pdf`);

    // Save resume data to a PDF file (this is pseudo-code; replace with actual PDF creation logic)
    fs.writeFile(filePath, resumeData, (err) => {
        if (err) {
            return res.status(500).send('Error saving resume');
        }
        res.send({ link: `/resume/${username}` });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
