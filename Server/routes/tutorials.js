const express =  require('express');
const config = require('config');

const appForTut = express.Router();
const mysql = require('mysql2');
var connection = mysql.createConnection({
    host     : config.get("host"),
    user     :  config.get("user"),
    password :  config.get("password"),
    database :  config.get("database")
   });

   appForTut.get("/:topic_id", (request, response)=>{
    console.log("tutorials GET - Request Received...")
    connection.query(`select * from tutorials where topic_id = ${request.params.topic_id}`, (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    response.setHeader("Content-Type","application/json");
                    console.log(data);
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(JSON.stringify(error));
                }
                response.end();
    })

})

module.exports = appForTut;