const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'admin' },
  { id: 2, username: 'user2', password: 'password2', role: 'user' }
];

const secretKey = 'your_secret_key';

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/api/logout', (req, res) => {
  // Handle logout (e.g., invalidate token)
  res.send('Logged out');
});

app.get('/api/protected', (req, res) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      } else {
        res.json({ message: 'Protected data', user: decoded });
      }
    });
  } else {
    res.status(401).send('No token provided');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
