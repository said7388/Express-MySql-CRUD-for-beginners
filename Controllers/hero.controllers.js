const db = require('../config/mysql');

// Get all hero data from the mySQL table
const getAllHeros = (req, res) => {
    db.query("SELECT * FROM Heros;", (err, result) => {
        res.json(result);
    })
};

// Add a new hero to the database table
const addNewHeros = (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const description = req.body.description;
    const sqlInsert = "INSERT INTO Heros (name, age, description) VALUES (?, ?, ?);";
    db.query(sqlInsert, [name, age, description], (err, result) => {
        console.log(err, result);
        if (result) {
            res.json({
                "message": "added successfully!"
            });
        }
    })
};

// update an existing hero from database table by id
const updateHeros = (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const id = req.body.id;
    const description = req.body.description;
    const sqlEdit = "UPDATE Heros SET ? where id=?;";
    db.query(sqlEdit, [{ name: name, age: age, description: description }, id], (err, result) => {
        console.log(err, result);
        if (result) {
            res.json({
                "message": "Edited"
            });
        }
    })
};

// Delete a hero from the database table by id
const deleteHero = (req, res) => {
    const id = parseInt(req.params.id);
    sqlDelete = "DELETE FROM Heros WHERE id=?;";
    db.query(sqlDelete, id, (err, result) => {
        console.log(err, result);
        if (result) {
            res.json({
                "message": "Delete successfully!"
            });
        }
    })
};

module.exports = {
    getAllHeros,
    addNewHeros,
    updateHeros,
    deleteHero,
}