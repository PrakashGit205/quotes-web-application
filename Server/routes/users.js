const express = require('express');
const appForTopic = express.Router();
const config = require('config');
const mysql = require('mysql2');
var connection = mysql.createConnection({
    host     : config.get("host"),
    user     :  config.get("user"),
    password :  config.get("password"),
    database :  config.get("database")
   });
   appForTopic.get("/", (request, response)=>{
    console.log("hii from login")
    var query = `INSERT INTO users (first_name, last_name, email, password)
    VALUES (${request.body.first_name},${request.body.last_name},${request.body.email},${request.body.password}) `;
    connection.query(query, (error, result) => {
        if (error == null) {
            var r = JSON.stringify(result);
            response.send(r);
        }
        else {
            console.log(error);
            response.send(JSON.stringify(error));
        }
    })
})
appForTopic.get("/:id", (request, response)=>{
    console.log("hii from edit users")
    var query = `select  first_name,last_name,email,mobile from users where id = ${request.params.id}`;
    connection.query(query, (error, result) => {
        if (error == null) {
            var r = JSON.stringify(result);
            response.send(r);
        }
        else {
            console.log(error);
            response.send(JSON.stringify(error));
        }
    })
})
appForTopic.put("/:id", (request, response)=>{
    console.log("hii from edit users")
    var query = `update users set mobile = ${request.body.mobile},first_name = '${request.body.first_name}',last_name= '${request.body.last_name}',email = '${request.body.email}' where id = ${request.params.id}`;
    connection.query(query, (error, result) => {
        if (error == null) {
            var r = JSON.stringify(result);
            response.send(r);
        }
        else {
            console.log(error);
            response.send(JSON.stringify(error));
        }
    })
})

module.exports = appForTopic;