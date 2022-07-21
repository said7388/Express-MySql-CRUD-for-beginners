const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/ mysql');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());


// App Home Route
app.get('/', (req, res) => {
    res.send("Welcome to mySql Server!");
})

// Get all data from mySQL
app.get('/heros', (req, res) => {
    db.query("SELECT * FROM Heros;", (err, result) => {
        res.json(result);
    })
})

// Add new data to the table
app.post('/hero/insert', (req, res) => {
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
})

// Update existing data from the mySQL table
app.put('/hero/edit', (req, res) => {
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
})

// Delete a specific data from the mySQL table by id
app.delete('/hero/delete/:id', (req, res) => {
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
})


app.listen(4000, () => {
    console.log("Server listening on port 4000");
})