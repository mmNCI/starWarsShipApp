const express = require('express');
const app = express();
const shipsRouter = require('./routes/ships');

app.use(express.static('public')); // serves index.html
app.use(express.json());
app.use('/ships', shipsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Running at http://localhost:${PORT}'));
// hello world
module.exports = app;