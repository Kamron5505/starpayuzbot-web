const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Serve static files from webapp directory
app.use(express.static(path.join(__dirname, 'webapp')));

// Serve index.html for root
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'webapp', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'index.html not found' });
  }
});

// Serve pages
app.get('/pages/:page', (req, res) => {
  const pagePath = path.join(__dirname, 'webapp', 'pages', req.params.page + '.html');
  if (fs.existsSync(pagePath)) {
    res.sendFile(pagePath);
  } else {
    res.status(404).json({ error: 'Page not found' });
  }
});

// Serve any HTML file
app.get('/:file.html', (req, res) => {
  const filePath = path.join(__dirname, 'webapp', req.params.file + '.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`[WebApp] Server running on port ${PORT}`);
  console.log(`[WebApp] Serving files from: ${path.join(__dirname, 'webapp')}`);
});
