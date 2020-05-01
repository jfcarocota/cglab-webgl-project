const express = require('express');
const app = express();

const port = 3000;

app.use('/src', express.static('src'));
app.use('/public', express.static('public'));

app.get('/', (req, res)=>{
    res.send('<h1>Hello World Node<h1/>');
});

app.get('/translate', (req, res)=>{
    res.sendfile('public/translate.htm');
});

app.get('/scale', (req, res)=>{
    res.sendfile('public/scale.htm');
});


app.listen(port, console.log(`listening at http://localhost:${port}`));

