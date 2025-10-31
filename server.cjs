const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Get ML service URL from environment (Render provides this)
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'https://object-detection-ml-y5v2.onrender.com';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Uploads
const upload = multer({ dest: path.join(__dirname, 'uploads') });

// ===== PROXY TO ML SERVER =====
app.use('/api', createProxyMiddleware({
  target: ML_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'ML service unavailable' });
  }
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    ok: true, 
    mlService: ML_SERVICE_URL,
    timestamp: new Date().toISOString()
  });
});

// START SERVER
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ ML Service URL: ${ML_SERVICE_URL}`);
});