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

router.get('/crear', function(req, res, next) {
  res.render('cuentas_crear');
});

router.post('/crear', function(req, res, next) {
  options.url = url + '/multichain/nuevo/'+ req.body.usuario_id;
  request(options, (error, response, body) => {
    if (error) {
      req.flash('errorMessage', error);
      res.redirect('/');
    } else {
      console.log(body);
      req.flash('successMessage', 'La cuenta ' + req.body.usuario_id + ' se ha creado exitosamente. Cartera: ' + JSON.parse(body).cartera_direccion);
      res.redirect('/');
    }
  });
});

router.get('/detalles/:cartera_id', function(req, res, next) {
  options.url = url + '/multichain/saldo/'+ req.params.cartera_id;
  request(options, (error, response, body) => {
    if (error) {
      req.flash('errorMessage', error);
      res.redirect('/');
    } else {
      var cuenta=JSON.parse(body).result[0];
      options.url = url + '/multichain/movimientos/'+ req.params.cartera_id;
      request(options, (error, response, body) => {
        if (error) {
          req.flash('errorMessage', error);
          res.redirect('/');
        } else {
          var movimientos=JSON.parse(body);
          console.log(movimientos);
          res.render('cuentas_detalle',{cuenta: cuenta,movimientos:movimientos,address:req.params.cartera_id});
        }
      });
    }
});
});

module.exports = router;
