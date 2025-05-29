const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.use('/components', express.static(path.join(__dirname, 'src/components')));


app.use('/src', express.static(path.join(__dirname, 'src')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
