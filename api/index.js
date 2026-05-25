const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());

// Serve static files from webapp directory FIRST
app.use(express.static(path.join(__dirname, '../webapp')));

// Serve assets explicitly
app.use('/assets', express.static(path.join(__dirname, '../webapp', 'assets')));
app.use('/css', express.static(path.join(__dirname, '../webapp', 'css')));
app.use('/js', express.static(path.join(__dirname, '../webapp', 'js')));
app.use('/pages', express.static(path.join(__dirname, '../webapp', 'pages')));

// Serve index.html for root
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../webapp', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'index.html not found' });
  }
});

// Serve pages - handle both with and without .html extension
app.get('/pages/:page', (req, res) => {
  let pagePath = path.join(__dirname, '../webapp', 'pages', req.params.page);
  
  // Try with .html extension if not provided
  if (!pagePath.endsWith('.html')) {
    pagePath += '.html';
  }
  
  if (fs.existsSync(pagePath)) {
    res.sendFile(pagePath);
  } else {
    res.status(404).json({ error: 'Page not found: ' + req.params.page });
  }
});

// Serve any HTML file
app.get('/:file.html', (req, res) => {
  const filePath = path.join(__dirname, '../webapp', req.params.file + '.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found: ' + req.path });
});

module.exports = app;
