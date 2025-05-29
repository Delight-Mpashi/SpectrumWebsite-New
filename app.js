const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.use('/Public/assets/Images', express.static(path.join(__dirname, 'public/assets/Images')));
app.use('/Public/assets/Fonts', express.static(path.join(__dirname, 'public/assets/Fonts')));
app.use('/Public/assets/Styles', express.static(path.join(__dirname, 'public/assets/Styles')));
app.use('/src/components', express.static(path.join(__dirname, 'src/components')));
app.use('/src/pages' , express.static(path.join(__dirname, 'src/pages')));
app.use('/src/assets', express.static(path.join(__dirname, 'src/assets')));
app.use('/public/assets', express.static(path.join(__dirname, 'public/assets')));


app.use('/src', express.static(path.join(__dirname, 'src')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
