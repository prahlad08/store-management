const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const purchase = require("./routes/purchase");
const reports = require('./routes/reports');
const autofill = require('./routes/autofill');
const sales = require('./routes/sales');
const product = require('./routes/product');
const connection = require('./lib/db');
const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.render("home");
});
// app.get("/purchase",function(req,res){
//     res.render("purchase");
// });
app.use('/purchase',purchase);
app.use('/reports',reports);
app.use('/autofill',autofill);
app.use('/sales',sales);
app.use('/product',product);
app.listen(3000,function(){
    console.log("Server running on Port 3000");
});