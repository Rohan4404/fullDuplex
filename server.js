const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json());

let btnState = 0; 
const stateFilePath = 'btnState.json'; 

// Load button state from file on server start
const loadState = () => {
    if (fs.existsSync(stateFilePath)) {
        const data = fs.readFileSync(stateFilePath);
        const json = JSON.parse(data);
        btnState = json.btnState;
    }
};

// Save button state to file
const saveState = () => {
    const json = JSON.stringify({ btnState });
    fs.writeFileSync(stateFilePath, json);
};

loadState();

// Toggle button state and return the new state as a number
app.post('/toggle-btn', (req, res) => {
    btnState = btnState === 0 ? 1 : 0; 
    saveState(); 
    res.json(btnState); // Return the state directly as a number
});

// GET request to retrieve the current button state as a number
app.get('/btn-state', (req, res) => {
    res.json(btnState); // Return the state directly as a number
});

// Set the port dynamically (required for Vercel)
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log("Btn State is ", btnState);
});
