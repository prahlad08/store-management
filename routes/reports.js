const express = require('express');
const router = express.Router();
const dbconn = require('../lib/db');
router.get("/",function(req,res){
    res.render("reports");
});
router.post("/",function(req,res){
    let from = req.body.from;
    let to = req.body.to;
    var repQuery = "SELECT p.productid,p.productname,sum(s.qty) as quantity,sum(s.paidamt) as amount FROM sales s,product p WHERE s.productid=p.productid and date between '"+from+"' and '"+to+"'group by productid,productname";
    var dates = [[from,to]];
    dbconn.query(repQuery,[dates],function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.render("rep_landing",{
                result1: result
            });
        }
    });
});

module.exports = router;