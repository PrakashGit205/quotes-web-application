const express =  require('express');
const config = require('config');
const topicsRelatedRoutes = require('./routes/users');
 const quotesRelatedRoutes = require('./routes/quotes');
const loginRelatedRoutes = require('./routes/login');
const favoriteRelatedRoutes = require('./routes/favorite');
const app = express();

app.use((request, response, next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers',"*");
    response.setHeader('Access-Control-Allow-Methods', "*")
    next();
})

app.use(express.json());

app.use('/quotes',quotesRelatedRoutes)
app.use('/login',loginRelatedRoutes);
app.use('/users',topicsRelatedRoutes);
app.use('/favorite',favoriteRelatedRoutes);

const portNo = config.get("PORT");
app.listen(portNo,()=>{console.log("Server Started at " + portNo)})