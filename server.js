const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json());

let btnState = 0; // This will reset with each function execution in serverless environments

// Toggle button state and return the new state as a number
app.post('/toggle-btn', (req, res) => {
    btnState = btnState === 0 ? 1 : 0; 
    console.log(`Button state toggled. New state: ${btnState}`); // Log the button state to the console
    res.json(btnState); // Return the state directly as a number
});

// GET request to retrieve the current button state as a number
app.get('/btn-state', (req, res) => {
    console.log(`Button state requested. Current state: ${btnState}`); // Log the button state to the console
    res.json(btnState); // Return the state directly as a number
});

// Set the port dynamically (required for Vercel)
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Current state: ${btnState}`);
});
