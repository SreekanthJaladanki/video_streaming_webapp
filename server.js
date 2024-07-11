const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Dummy user data
const users = {
    user1: { username: 'user1', password: 'password1' },
    // Add more users as needed
};

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (user && user.password === password) {
        req.session.user = user;
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Serve home.html after successful login
app.get('/home', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/public/home.html');
    } else {
        res.redirect('/');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Logout endpoint
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.redirect('/');
    });
});
// Middleware to protect routes
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/');
    }
}

// Use middleware for protected routes
app.get('/home', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});
