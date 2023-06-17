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
   appForTopic.get("/:user_id", (request, response)=>{
    console.log("hii from favorite get"+ count++)
    console.log( request.params.user_id )
    var query = `select distinct id,author,fq.user_id,quote_text from quotes q, favorite_quotes fq where q.id = fq.quote_id and fq.user_id = ${request.params.user_id} `
    console.log(request.params)
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
var count =0;
appForTopic.post("/:id/:user_id", (request, response)=>{
    console.log("hii from insert in likes " + count++)
    console.log(request.params.id + request.params.user_id )
    var query = `INSERT INTO favorite_quotes (quote_id, user_id)
    VALUES (${request.params.id},${request.params.user_id})`;
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
appForTopic.delete("/:id/:user_id", (request, response)=>{
    console.log("hii from delete in fav"+ count++)
    console.log(request.params.id + request.params.user_id )
    var query = `delete from favorite_quotes where quote_id =  ${request.params.id} and user_id = ${request.params.user_id}`;
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