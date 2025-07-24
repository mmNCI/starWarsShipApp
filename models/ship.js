const db = require('../db');
// define methods for dealing with one ship record
exports.create = (name, shipType, faction, appeared, callback) => {
    const sql = `INSERT INTO items (name, shipType, faction, appeared) VALUES (?, ?, ?, ?)`;
    const params = [name, shipType, faction, appeared];
    db.run(sql, params,
        function (err) {
            callback(err, this?.lastID);
        }
    );
};

exports.update = function (id, name, shipType, faction, appeared, callback) {
    const sql = `UPDATE ships SET name = ?, shipType = ?, faction = ?, appeared = ? WHERE id = ?`;
    const params = [name, shipType, faction, appeared, id];
    db.run(sql, params, function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { changes: this.changes });
        }
    });
};