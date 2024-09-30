const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Route to get location
app.get('/location', async (req, res) => {
    try {
        // Get the IP address from query parameter
        const clientIp = req.query.ip || (req.headers['x-forwarded-for'] || req.connection.remoteAddress);
        
        // Fetch location data based on the provided IP
        const response = await axios.get(`https://geolocation-db.com/json/${clientIp}&position=true`);
        console.log(clientIp);
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching location data:', error);
        res.status(500).send('Error fetching location data.');
    }
});

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
