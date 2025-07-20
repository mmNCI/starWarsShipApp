const sqlite3 = require('sqlite3');

const myDB = new sqlite3.Database("./", (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("connection established")
})

myDB.close((err) => {
    if (err) {
        return console.log(err)
    }
    console.log("connection closed")
})