var express = require('express');
var router = express.Router();

/* GET home page. */

lista=[{"address" : "1MNtLQwkTRh4yiJNZ3n3RSPXTMPqEWiMVSQYWD","ismine" : true},{"address" : "19iHFpA5xoyufCpq7d3R1Tc7rbbULhUctDVcyE","ismine" : true}];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Client',lista:lista});
});

module.exports = router;
