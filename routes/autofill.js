const express = require("express");
const dbconn = require("../lib/db");
const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", function (req, res) {
  console.log("Autofill request");
});
router.post("/:pid", function (req, res) {
  console.log(req.params);
  let today = new Date().toISOString().slice(0, 10);

  dbconn.query(
    "SELECT * FROM product WHERE productid = '" + req.params.pid + "'",
    function (err, result) {
      if (!err) {
        console.log(result);
        if (result.length > 0) {
          if (result[0].productid == req.params.pid) {
            dbconn.query(
              "SELECT * FROM stock WHERE productid='" + req.params.pid + "'",
              function (err, result1) {
                var data = {
                  name: result[0].productname,
                  mrp: result[0].mrp,
                  date: today,
                  pp: result[0].purchaseprice,
                  stock: result1[0].quantity,
                };
                console.log(data);
                res.send(data);
              }
            );
          }
        }else
        {
          res.send({ 
            name: "",
            mrp: "",
            date: today,
            pp: "",
            stock: "",});
        }
      }
    }
  );
});
module.exports = router;
