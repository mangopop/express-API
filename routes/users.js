var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST to Add User Service */
router.post('/add', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.data.username;
    console.log(req.body.data);
    var userEmail = req.body.data.email;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("list");
        }
    });
});

/* GET json users. */
router.get('/getusers', function(req, res, next) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({ "username": "simon", $and: [ { "email": "sim.nort" } ] },function(e,docs){
        res.json('list', {
            "list" : docs
        });
    });
});

/* GET list page. */
router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
      res.status(200).json({
            "list" : docs
        })
    });
});

module.exports = router;
