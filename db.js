const sqlite3 = require('sqlite3');

const myDB = new sqlite3.Database("./data.sqlite", (err) => {
  if (err) {
    return console.log(err)
  }
  console.log("connection established")
})
myDB.run(`
  CREATE TABLE IF NOT EXISTS ships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    shipType TEXT NOT NULL,
    faction TEXT NOT NULL,
    appeared TEXT NOT NULL
  )
`);

module.exports = myDB;
/* myDB.close((err) => {
  if (err) {
    return console.log(err)
  }
  console.log("connection closed")
}) */