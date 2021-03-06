//var http = require('http');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sql = require("./db.js");

/*http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('hello world')
    res.end();
}).listen(3000);*/

// parse requests of contenttype: application/json
app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to web course example application." });
});

// Create a route for getting all students
app.get("/students", function(req, res){
    sql.query("select * from students", (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in getting all students: " + err});
            return;
        }
        console.log("got all students...");
        res.send(mysqlres);
        return;
    });
});

// set port, listen for requests
app.listen(3000, () => {
console.log("Server is running on port 3000.");
});