const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Serve static files from "Public" folder
app.use(express.static(path.join(__dirname, 'Public')));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
