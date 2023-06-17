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
    console.log("hii from quotes")
    var query = `select * from quotes `
    // , fq.quote_id q,favorite_quotes fq where fq.user_id = q.user_id`;
    console.log(request.body)
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
appForTopic.get("/:user_id", (request, response)=>{
    console.log("hii from login")
    var query = `select * from quotes where user_id = ${request.params.user_id}`;
    console.log(request.body)
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
appForTopic.post("/:user_id", (request, response)=>{
    console.log("hii from login")
    var query = `INSERT INTO quotes (quote_text, author, user_id)
    VALUES ('${request.body.quote_text}','${request.body.author}',${request.params.user_id})`;
    console.log(request.body)
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

appForTopic.put("/", (request, response)=>{
    console.log("hii from put of edit")
    var query = `update quotes set quote_text = '${request.body.quote_text}',author = '${request.body.author}' where id =${request.body.id}`;
    console.log(request.body)
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
appForTopic.delete("/:id", (request, response)=>{
    console.log("hii from put of delete")
    var query = `delete from quotes where id = ${request.params.id}`;
    console.log(request.body)
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
    console.log("hii from get quote id of user")
    var query = `select id from quotes where id = any(select quote_id from favorite_quotes where user_id = ${request.params.id})`;
    console.log(request.body)
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