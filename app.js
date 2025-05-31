const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Serve static files
app.use(express.static(path.join(__dirname, 'Public')));
app.use('/components', express.static(path.join(__dirname, 'src/components')));
app.use('/pages', express.static(path.join(__dirname, 'src/pages')));
app.use('/src-assets', express.static(path.join(__dirname, 'src/assets')));

// Root route (only sends index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});