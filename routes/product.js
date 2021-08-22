const express = require('express');
const dbconn = require('../lib/db')
const router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

router.get("/add",function(req,res){
    res.render("product_add");
})
router.post("/add",function(req,res){
	var data1={
	productid:req.body.Productid,
	productname:req.body.Productname,
	mrp:req.body.Mrp,
	purchaseprice:req.body.PurchasePrice
	};
	var data2={
	productid:req.body.Productid,
	quantity:0
	};
  var sql1 = "INSERT INTO product SET ?" ;
  var sql2 = "INSERT INTO stock Set ?";
  dbconn.query(sql1,data1, function (err, result,fields) {
    if (err) throw err;
    console.log(" record inserted into product !");
  });
  dbconn.query(sql2,data2, function (err, result,fields) {
    if (err) throw err;
    console.log(" record inserted into stock !");
  });
	res.render("product_add");
});

router.get("/edit",function(req,res){
    res.render("product_edit");
})
router.post("/edit",function(req,res){
	var data1={
	productname:req.body.Productname,
	mrp:req.body.Mrp,
	purchaseprice:req.body.PurchasePrice
	};
  var sql1 = "update product SET ? where productid='"+req.body.Productid +"'";
  
  dbconn.query(sql1,data1, function (err, result,fields) {
    if (err) throw err;
    console.log(" record updated in products !");
  });
	res.render("product_edit");
});
router.get("/delete",function(req,res){
    res.render("product_delete");
})
router.post("/delete",function(req,res){
	
  var sql1 = "delete from product  where productid='"+req.body.Productid +"'";
  dbconn.query(sql1, function (err, result,fields) {
    if (err) throw err;
    console.log(" record deleted in products !");
  });
	res.render("product_delete");
});

module.exports  = router;