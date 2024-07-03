const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// Predefined users (normally you'd use a database)
const users = {
    'admin': { password: bcrypt.hashSync('password123', 10) }  // hashed for security
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = username;  // set the username in session
        res.redirect('/home');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.get('/home', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/home.html');  // send the homepage if logged in
    } else {
        res.redirect('/');
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
