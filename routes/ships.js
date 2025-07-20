const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all ships
router.get('/', (req, res) => {
    db.all('SELECT * FROM ships', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST a new ship
router.post('/', (req, res) => {
    const { iName, iType, iFaction, iFirstAppearence } = req.body;
    if (!iName || iType || iFaction || iFirstAppearence == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const sql = 'INSERT INTO ships (iName, iType, iFaction, iFirstAppearence) VALUES (?, ?)';
    db.run(sql, [iName, iType, iFaction, iFirstAppearence], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

// PUT update an item
router.put('/:id', (req, res) => {
    const { iName, iType, iFaction, iFirstAppearence } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE ships SET iName = ? SET iType= ? SET iFaction= ? SET iFirstAppearence= ?, quantity = ? WHERE id = ?';
    db.run(sql, [iName, iType, iFaction, iFirstAppearence, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Ship not found' });
        res.json({ message: 'Ship updated' });
    });
});

// DELETE an item
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM items WHERE id = ?', id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Ship deleted' });
    });
});

module.exports = router;