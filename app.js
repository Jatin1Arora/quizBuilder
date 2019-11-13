const mongoose = require('mongoose');
const express = require("express");
const parser=require('body-parser');
const morgan =require('morgan');
const routes = require("./routes");


const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost/quiz", { useNewUrlParser: true ,useUnifiedTopology: true})
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.error("Error connecting to Database: ", err);
});

app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static('./public'));
app.use('/',routes);

app.listen(port,function(){
    console.log("API listening on port "+port);
});