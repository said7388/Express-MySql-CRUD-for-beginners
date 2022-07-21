const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const heroRouter = require('./Routes/hero.routes');
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/hero', heroRouter);

// App Home Route
app.get('/', (req, res) => {
    res.send("Welcome to mySql Server!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({
        message: "No such route exists"
    })
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: "Something went wrong"
    })
});

app.listen(port, () => {
    console.log("Server listening on port 4000");
});