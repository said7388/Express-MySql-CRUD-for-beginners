const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'superheros',
})

app.get('/', (req, res) => {
    res.send("Welcome to mySql Server!");
})

app.get('/heros', (req, res) => {
    db.query("SELECT * FROM superheros.heros;", (err, result) => {
        res.json(result);
    })
})

app.post('/hero/insert', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const description = req.body.description;
    const sqlInsert = "INSERT INTO heros (name, age, description) VALUES (?, ?, ?);";
    db.query(sqlInsert, [name, age, description], (err, result) => {
        console.log(err, result);
        if (result) {
            res.json({
                "message": "added successfully!"
            });
        }
    })
})

app.put('/hero/edit', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const id = req.body.id;
    const description = req.body.description;
    const sqlEdit = "UPDATE heros SET ? where id=?;";
    db.query(sqlEdit, [{ name: name, age: age, description: description }, id], (err, result) => {
        console.log(err, result);
        if (result) {
            res.json({
                "message": "Edited"
            });
        }
    })
})

app.delete('/hero/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    sqlDelete = "DELETE FROM heros WHERE id=?;";
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