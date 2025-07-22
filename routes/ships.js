const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all ships
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM ships';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }

    });
});

// POST a new ship
router.post('/', (req, res) => {
    const { name, shipType, faction, appeared } = req.body;
    if (!name || !shipType || !faction || !appeared) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const sql = 'INSERT INTO ships (name, shipType, faction, appeared) VALUES (?, ?, ?, ?)';
    const params = [name, shipType, faction, appeared];
    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
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
    const { name, shipType, faction, appeared } = req.body;
    //const { id } = req.params;
    const sql = 'UPDATE ships SET name = ? SET shipType= ? SET faction= ? SET appeared= ? WHERE id = ?';
    db.run(sql, [name, shipType, faction, appeared, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Ship not found' });
        res.json({ message: 'Ship updated' });
    });
});

// DELETE an item
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM ships WHERE id = ?';
    db.run(sql, id, function (err) {

        if (err) {
            console.error('Delete error: ', err.message);
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Ship deleted' });
    });
});

module.exports = router;