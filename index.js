const express = require('express');
const app = express();
const bodyparser = require("body-parser");

const mysql = require('mysql2');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// create the connection to database
const connection = mysql.createConnection({
    host: '172.17.0.2',//ip de 'db'
    user: 'root',
    password: 'rtlry',
    database: 'ProgWeb'
});

app.get('/todos', function (req, res) {
    connection.query('SELECT * from todos;', function (error, results) {
        if (error) throw error;
        results.map(function (todos) {
            if (todos.isDone == 1) {
                todos.isDone = "Fait."
            } else {
                todos.isDone = "A Faire."
            }
        });
        res.json(results);
    });
});

app.post('/todos', function (req, res) {
    let label = req.body.label;
    let isDone = (req.body.isDone == 'true');
    connection.query('Insert into todos(label, isDone) values (?,?);', [label, isDone], function (error, results) {
        if (error) throw error;
        console.log("Données ajoutées !");
    })
});

app.put('/todos/:id', function (req, res) {
    let id = req.params.id;
    let label = req.body.label;
    let isDone = (req.body.isDone == 'true'); 
    connection.query('Update todos set label = ? , isDone = ? where id = ?;', [label, isDone, id], function (error, results) {
        if (error) throw error;
        console.log("Données modifiées !");
    });
});

app.delete('/todos/:id', function (req, res) {
    let id = req.params.id;
    connection.query('Delete from todos where id =?;', [id], function (error, results) {
        if (error) throw error;
        console.log("Données supprimées !");
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
