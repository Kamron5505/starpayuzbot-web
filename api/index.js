const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

// API: Topup balance
app.post('/api/topup', async (req, res) => {
  try {
    const { amount, initData } = req.body;
    
    if (!amount || !initData) {
      return res.status(400).json({ error: 'Amount and initData required' });
    }
    
    if (amount < 1000 || amount > 10000000) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    
    // Send to bot backend for processing
    const botApiUrl = process.env.BOT_API_URL || 'http://localhost:3001';
    
    const response = await axios.post(`${botApiUrl}/api/topup`, {
      amount,
      initData
    }, {
      timeout: 5000
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Topup error:', error.message);
    res.status(500).json({ error: 'Failed to process topup' });
  }
});

// API: Get user balance
app.post('/api/balance', async (req, res) => {
  try {
    const { initData } = req.body;
    
    if (!initData) {
      return res.status(400).json({ error: 'initData required' });
    }
    
    // Send to bot backend for processing
    const botApiUrl = process.env.BOT_API_URL || 'http://localhost:3001';
    
    const response = await axios.post(`${botApiUrl}/api/balance`, {
      initData
    }, {
      timeout: 5000
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Balance error:', error.message);
    res.status(500).json({ error: 'Failed to get balance' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found: ' + req.path });
});

module.exports = app;
