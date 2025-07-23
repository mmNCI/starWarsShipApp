const express = require('express');
const path = require('path');
const shipsRouter = require('./routes/ships');

const app = express();

app.use(express.json());
//app.use(express.static('public')); // serves index.html




app.use(express.static(path.join(__dirname, 'Public')));
app.use('/ships', shipsRouter);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
})
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log('Running at http://localhost:${PORT}'));
// hello world
module.exports = app;