const express = require('express');
const appForLogin = express.Router();
const config = require('config');
const mysql = require('mysql2');
var connection = mysql.createConnection({
    host     : config.get("host"),
    user     :  config.get("user"),
    password :  config.get("password"),
    database :  config.get("database")
   });
   appForLogin.post("/", (request, response)=>{
    console.log("hii from sign in")
    var query = `select first_name, last_name,id from users where email = '${request.body.email}' and password = '${request.body.password}'`;
    console.log(request.body)
    connection.query(query, (error, result) => {
        if (error == null) {
            var r = JSON.stringify(result);
            console.log(result);
            console.log(r);
            response.send(r);
        }
        else {
            console.log(error);
            response.send(JSON.stringify(error));
        }
    })
})

module.exports = appForLogin;