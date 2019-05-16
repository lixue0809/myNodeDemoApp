var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/myNodeDemoApp";

/* GET home page. */
router.get("/", function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myNodeDemoApp");
    var whereStr = { 
      userName: req.query.userName,
      psw:req.query.psw
    }; // 查询条件
    dbo
      .collection("user")
      .find(whereStr)
      .toArray(function(err, result) {
        if (err) throw err;
        console.log('result登录'+result)
        var rst;
        if (result && result.length > 0) {
          rst = { status: "OK", msg: "登陆成功" };
        } else {
          rst = { status: "NG", msg: "您的用户名或者密码错误！" };
        }
        res.end(JSON.stringify(rst));
        db.close();
      });
      });
  });

module.exports = router;
