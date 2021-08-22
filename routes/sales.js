const express = require("express");
const dbconn = require("../lib/db");
const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

let bill = [];
router.get("/", function (req, res) {
  bill = [];
  res.render("sales", { bill: bill });
});
router.post("/", function (req, res) {
  let stock = 0;
  if (req.body.Quantity > 0) {
    bill.push(req.body);
    console.log(bill);
    let data1 = {
      productid: req.body.Productid,
      qty: req.body.Quantity,
      paidamt: req.body.Mrp * req.body.Quantity,
      date: req.body.EDate,
    };
    dbconn.query(
      "SELECT * FROM stock WHERE productid ='" + req.body.Productid + "'",
      function (err, result1) {
        stock = result1[0].quantity;
      }
    );
    console.log(stock);
    let data2 = {
      quantity: Number(stock) - Number(req.body.Quantity),
    };
    const sql1 = "INSERT INTO sales SET ?";
    const sql2 =
      "update stock Set quantity = quantity - " +
      req.body.Quantity +
      " where productid ='" +
      req.body.Productid +
      "'";
    dbconn.query(sql1, data1, function (err, result, fields) {
      if (err) throw err;
      console.log(" record inserted into sales !");
    });
    dbconn.query(sql2, function (err, result, fields) {
      if (err) throw err;
      console.log(" record updated  in stock !");
    });
  }
  if (req.body.buttonpress == 2) {
    bill = [];
  }
  res.render("sales", { bill: bill });
});

module.exports = router;
