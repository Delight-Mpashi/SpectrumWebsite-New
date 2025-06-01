const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

// ✅ Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.jpg') || filePath.endsWith('.png') || filePath.endsWith('.webp')) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

// ✅ Root route - load index.html
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  console.log(`Looking for index.html at: ${indexPath}`); // Helpful log

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Index file not found');
  }
});

// ✅ Test image route (optional)
app.get('/test-image', (req, res) => {
  const imagePath = path.join(__dirname, 'public', 'assets', 'images', 'dashboardimage.jpg');

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

// ✅ 404 handler - use lowercase 'public'
app.use((req, res) => {
  const notFoundPath = path.join(__dirname, 'public', '404.html');
  if (fs.existsSync(notFoundPath)) {
    res.status(404).sendFile(notFoundPath);
  } else {
    res.status(404).send('404 Not Found');
  }
});

// ✅ 500 error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const errorPath = path.join(__dirname, 'public', '500.html');
  if (fs.existsSync(errorPath)) {
    res.status(500).sendFile(errorPath);
  } else {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at: http://localhost:${port}`);
  console.log(`📁 Static files served from: ${path.join(__dirname, 'public')}`);
});
