var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/myNodeDemoApp";

/* GET home page. */
router.get("/", function(req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("myNodeDemoApp");
    var myobj = {
      content: req.query.content,
    };
    var rst;
    dbo.collection("blog").insertOne(myobj, function(err, result) {
        if (err) {
          throw err;
        } else {
          rst={
            msg:"微博发布成功"
          }
          res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
          res.end(JSON.stringify(rst));
        }
        db.close();
    });
});
});

module.exports = router;
