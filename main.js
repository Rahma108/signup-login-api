const { randomUUID } = require('crypto');
const cors = require('cors');
const express = require('express');
const path = require('path')
const app = express();
const port = 3000;

const fs = require('fs');
const usersFilePath = path.resolve('./users.json');


function getUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading users file:", err);
        return [];
    }
}

function saveUsers(users) {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error("Error writing users file:", err);
    }
}


// Middleware
app.use(express.json() , cors());
// ----------- SIGN UP -----------
app.post('/signup', (req, res) => {
    const { userName, email, password } = req.body;
    const users = getUsers();

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(409).json({ message: 'Email is Already Exist 😊' });
    }

    const newUser = { id: randomUUID(), userName, email, password };
    users.push(newUser);
    saveUsers(users);

    return res.status(201).json({ message: 'Sign up successful ✅', user: newUser });
    });

// ----------- LOGIN -----------
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(404).json({ message: 'INVALID LOGIN DATA ❌' });
    }

    return res.status(200).json({ message: 'Login successful ✅', user });
    });


    // ----------- START SERVER -----------
    app.listen(port, () => {
    console.log(`Server running on http://localhost:${port} 🚀🚀🚀`);
});