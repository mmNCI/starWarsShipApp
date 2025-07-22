const db = require('../db');

exports.create = (name, shipType, faction, appeared, callback) => {
    db.run(
        `INSERT INTO items (name, shipType, faction, appeared) VALUES (?, ?, ?, ?)`,
        [name, shipType, faction, appeared],
        function (err) {
            callback(err, this?.lastID);
        }
    );
};