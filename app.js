const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

// Serve static files from Public directory
app.use(express.static(path.join(__dirname, 'Public'), {
  // Additional static file options
  maxAge: '1d', // Cache static assets for 1 day
  setHeaders: (res, path) => {
    if (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.webp')) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

// Root route
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'Public', 'index.html');
  
  // Verify file exists before sending
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Index file not found');
  }
});

// Test route for image debugging
app.get('/test-image', (req, res) => {
  const imagePath = path.join(__dirname, 'Public', 'assets', 'images', 'dashboardimage.jpg');
  
  if (fs.existsSync(imagePath)) {
    res.json({
      exists: true,
      path: imagePath,
      relativePath: '/assets/images/dashboardimage.jpg'
    });
  } else {
    res.status(404).json({
      exists: false,
      message: `Image not found at: ${imagePath}`,
      suggestion: 'Check case sensitivity (Linux servers require exact case matching)'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'Public', '404.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, 'Public', '500.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Static files served from: ${path.join(__dirname, 'Public')}`);
});