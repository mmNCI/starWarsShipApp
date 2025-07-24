const express = require('express');
const router = express.Router();
const db = require('../db');
const ship = require('../models/ship');
//const { descriptors } = require('chart.js/dist/core/core.defaults');

// GET all ships
router.get('/', (req, res) => {
    // sql instruction stored in variable called sql
    const sql = 'SELECT * FROM ships';
    // looks at db.js and uses sql variable as argument
    db.all(sql, [], (err, rows) => {
        // if any error occurs, return with 500 status and error message
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            // if no errors occur then send each row of database table in json format  
            res.json(rows);
        }

    });
});

// POST a new ship
router.post('/', (req, res) => {
    // store all variables pertaining to each ship and submit to requested body 
    const { name, shipType, faction, appeared } = req.body;
    // if any field is empy then a message will return to the user that all fields must be filled
    if (!name || !shipType || !faction || !appeared) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    // variable stores sql instruction, when executed this will insert new info into the table ships
    const sql = 'INSERT INTO ships (name, shipType, faction, appeared) VALUES (?, ?, ?, ?)';
    // params holds the information that will be inserted into the table
    const params = [name, shipType, faction, appeared];
    // comunicate with db.js and insert into ships table with this information
    db.run(sql, params, function (err) {
        // if any error occurs return error message
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // if record has sucessfully been inserted then return status 201 meaning sucessful response
        res.status(201).json({
            id: this.lastID,
            name,
            shipType,
            faction,
            appeared,
        });
    });
});

// PUT update an item
router.put('/:id', (req, res) => {
    // get id of current ship to be updated
    const id = req.params.id;
    // store all variables pertaining to each ship and submit to requested body 
    const { name, shipType, faction, appeared } = req.body;
    // debug to see if the request holds this info
    console.log('Update request:', { id, name, shipType, faction, appeared });

    // specific record is updated, record identified with id pointing to location within database
    ship.update(id, name, shipType, faction, appeared, (err, result) => {
        if (err) {
            // debug
            console.error('DB error:', err);
            // if there is an error return with error message
            res.status(500).json({ error: 'Update failed' })
        } else {
            // if ship record is updated, return message
            res.json({ message: 'Ship updated', result })
        }
    })
});

// DELETE an item
router.delete('/:id', (req, res) => {
    // get id of ship record to delete 
    const id = req.params.id;
    // store sql instruction to the delete ship in variable, delete from table ships, what id?
    const sql = 'DELETE FROM ships WHERE id = ?';
    // contact db.js and use id and sql variables as arguments in run method
    db.run(sql, id, function (err) {

        if (err) {
            // debug 
            console.error('Delete error: ', err.message);
            // if there is an error return message to user 
            return res.status(500).json({ error: err.message });
        }
        // if there are no changes, ie 0 or false, changes are false the return 404 status 
        if (this.changes === 0) return res.status(404).json({ error: 'Item not found' });

        // return message if deletion if record is sucessful
        res.json({ message: 'Ship deleted' });
    });
});

module.exports = router;