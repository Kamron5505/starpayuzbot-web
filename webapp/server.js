const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve HTML files
app.get('*.html', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

// Serve pages
app.get('/pages/:page', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', req.params.page + '.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`[WebApp] Server running on port ${PORT}`);
});
