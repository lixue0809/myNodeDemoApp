// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: '微博博客' });
// });

// module.exports = router;
var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/myNodeDemoApp";


router.get("/", function(req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myNodeDemoApp");
    dbo
      .collection("blog")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        res.render("index", {data: result,title: '博客首页'});
        db.close();
      });
  });
});
 
module.exports = router;

