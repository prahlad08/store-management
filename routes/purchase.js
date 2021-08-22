const express = require('express');
const router = express.Router();
const dbconn = require('../lib/db');
router.get("/",function(req,res){
    res.render("purchase");
});

router.post("/",function(req,res){
    let pid = req.body.pid;
    let pname = req.body.pname;
    let qty = req.body.qty;
    let supplier = req.body.supplier;
    let suppid = req.body.suppid;
    let date = req.body.date;
    let pprice = req.body.pprice;
    let mrp = req.body.mrp;
    var prodquery = "INSERT into product(productid,productname,mrp,purchaseprice) VALUES ? ON DUPLICATE KEY UPDATE productname = '"+pname+"', mrp = "+mrp+", purchaseprice = "+pprice;
    var valuesProd = [[pid,pname,mrp,pprice]];
    dbconn.query(prodquery,[valuesProd],function(err,result){
        if(err){
            console.log(err);
        }
        else{
            console.log("Success");
            // res.redirect("purchase");
        }
    });
    var stockQuery = "INSERT into stock(productid,quantity) VALUES ? ON DUPLICATE KEY UPDATE quantity = quantity+"+qty;
    var stockProd = [[pid,qty]];
    dbconn.query(stockQuery,[stockProd],function(err,result){
        if(err)
            console.log(err);
        else{
            console.log("Success");
        }
    });
    var purQuery = "INSERT into purchase(productid,qty,paidamt,date,suppid,supplier) VALUES ?";
    var purValues = [[pid,qty,pprice*qty,date,suppid,supplier]];
    dbconn.query(purQuery,[purValues],function(err,result){
        if(err)
            console.log(err);
        else
            console.log("Success");
    });
    res.redirect("purchase");
});

module.exports = router;