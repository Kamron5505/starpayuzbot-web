const axios = require('axios');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { initData } = req.body;

    if (!initData) {
      return res.status(400).json({ success: false, error: 'Missing initData' });
    }

    // Parse initData to get user_id
    const params = new URLSearchParams(initData);
    const userStr = params.get('user');
    
    if (!userStr) {
      return res.status(400).json({ success: false, error: 'Invalid user data' });
    }

    let userData;
    try {
      userData = JSON.parse(decodeURIComponent(userStr));
    } catch (e) {
      userData = JSON.parse(userStr);
    }

    const userId = userData?.id;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID not found' });
    }

    // Send to local bot API server
    const botApiUrl = process.env.BOT_API_URL || 'http://localhost:3001';
    
    try {
      const response = await axios.post(`${botApiUrl}/api/balance`, {
        initData,
        userId
      }, {
        timeout: 5000
      });

      return res.status(200).json({
        success: true,
        data: response.data
      });
    } catch (botError) {
      console.error('Bot API error:', botError.message);
      
      // Return default balance if bot API is not available
      return res.status(200).json({
        success: true,
        userId,
        balance: 0,
        note: 'Default balance'
      });
    }

  } catch (error) {
    console.error('Balance error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
