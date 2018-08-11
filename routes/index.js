var express = require('express');
var router = express.Router();
const request = require('request');

url = "http://192.168.1.107:3000"
let options = {
  url: "",
  rejectUnhauthorized: 'false',
  method: "GET",
  headers: {
    "content-type": "text/plain"
  }
};


/* GET home page. */

router.get('/', function(req, res, next) {
  options.url = url + '/multichain/cuentas';
  request(options, (error, response, body) => {
    if (error) {
      res.send(error);
    } else {
      console.log(body);
      res.render('index', {
        lista: JSON.parse(body).result
      });
    }
  });
});

module.exports = router;
