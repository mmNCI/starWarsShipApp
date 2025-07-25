const express = require('express');
const path = require('path');
const shipsRouter = require('./routes/ships');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'Public')));
// when /ships is used, 
app.use('/ships', shipsRouter);

app.get('/', (req, res) => {
    // when / is used in url, file is sent from Public folder called index.html, this is the landing page
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
})

module.exports = app;