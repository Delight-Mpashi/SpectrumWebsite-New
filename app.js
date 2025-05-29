const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve all of /public statically
app.use(express.static(path.join(__dirname, 'public')));

// Serve extra directories
app.use('/components', express.static(path.join(__dirname, 'src/components')));
app.use('/pages', express.static(path.join(__dirname, 'src/pages')));
app.use('/src-assets', express.static(path.join(__dirname, 'src/assets')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src','components', 'public', 'index.html', 'navbar.html','footer.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
