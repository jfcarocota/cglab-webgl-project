const express = require('express');
const app = express();

const port = 3000;

app.use('/src', express.static('src'));
app.use('/public', express.static('public'));
app.use('/shaders', express.static('shaders'));
app.use('/images', express.static('images'));

app.get('/', (req, res)=>{
    res.send('<h1>Hello World Node<h1/>');
});

app.get('/translate', (req, res)=>{
    res.sendFile(`${__dirname}/public/translate.htm`);
});

app.get('/scale', (req, res)=>{
    res.sendFile(`${__dirname}/public/scale.htm`);
});

app.get('/matrices', (req, res)=>{
    res.sendFile(`${__dirname}/public/projectionModelViewMatrix.htm`);
});

app.get('/externalfile', (req, res)=>{
    res.sendFile(`${__dirname}/public/externalFile.htm`);
});

app.get('/texture', (req, res)=>{
    res.sendFile(`${__dirname}/public/textureapp.htm`);
});

app.get('/spriteanim', (req, res)=>{
    res.sendFile(`${__dirname}/public/spritesheetapp.htm`);
});

app.listen(port, console.log(`listening at http://localhost:${port}`));

