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
    database: 'SuperHero',
})

app.get('/', (req, res) => {
    res.send("Welcome to mySql Server!");
})

app.post('/hero/insert', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const description = req.body.description;
    const sqlInsert = "INSERT INTO Heros (name, age, description) VALUES (?, ?, ?);";
    db.query(sqlInsert, [name, age, description], (err, result) => {
        console.log(err, result);
        res.json({
            "message": "added successfully!"
        });
    })
})

app.get('/heros', (req, res) => {
    db.query("SELECT * FROM SuperHero.Heros;", (err, result) => {
        res.json(result);
    })
})

app.listen(4000, () => {
    console.log("Server listening on port 4000");
})