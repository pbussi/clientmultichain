var express = require('express');
var router = express.Router();
const request = require('request');


var url = "http://192.168.1.107:3000"
var options = {
  url: "",
  rejectUnhauthorized: 'false',
  method: "GET",
  headers: {
    "content-type": "text/plain"
  }
};

router.get('/', function(req, res, next) {
  options.url = url + '/multichain/cuentas';
  request(options, (error, response, body) => {
    if (error) {
      res.send(error);
    } else {
      res.render('index', {
        lista: JSON.parse(body).result
      });
    }
  });
});

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
          res.render('cuentas_detalle',{cuenta: cuenta,movimientos:movimientos,address:req.params.cartera_id});
        }
      });
    }
});
});


router.post('/agregar_movimiento', function(req, res, next) {
  options.url = url + '/multichain/agregar_movimiento/'+
        req.body.Cartera+'/'+req.body.Concepto+'/'+req.body.Importe+'/'+req.body.Factura+'/'+req.body.Acreedor;
  request(options, (error, response, body) => {
    if (error) {
      req.flash('errorMessage', error);
        res.redirect('/cuentas/detalles/'+req.body.Cartera);
    } else {
      if (response.statusCode=='404'){
        req.flash('errorMessage', 'Datos invalidos o incompletos');
        res.redirect('/cuentas/detalles/'+req.body.Cartera);
      }else{
        var respuesta=JSON.parse(body);
        if (respuesta.error!=null){
            req.flash('errorMessage', respuesta.error.message);
            res.redirect('/cuentas/detalles/'+req.body.Cartera);
        } else {
            req.flash('successMessage', 'La cuenta ' + req.body.Cartera + ' se ha cargado con '+ req.body.Importe);
            res.redirect('/cuentas/detalles/'+req.body.Cartera);
          }
        }
      }
   });
});

router.post('/quemar', function(req, res, next) {
  options.url = url + '/multichain/quemar/'+
        req.body.Cartera+'/'+req.body.Concepto+'/'+req.body.Importe+'/'+req.body.Factura;
  request(options, (error, response, body) => {
    if (error) {
      req.flash('errorMessage', error);
        res.redirect('/cuentas/detalles/'+req.body.Cartera);
    } else {
      if (response.statusCode=='404'){
        req.flash('errorMessage', 'Datos invalidos o incompletos');
        res.redirect('/cuentas/detalles/'+req.body.Cartera);
      }else{
        var respuesta=JSON.parse(body);
        if (respuesta.error!=null){
            req.flash('errorMessage', respuesta.error.message);
            res.redirect('/cuentas/detalles/'+req.body.Cartera);
        } else {
            req.flash('successMessage', 'De la cuenta ' + req.body.Cartera + ' se han quemado '+ req.body.Importe);
            res.redirect('/cuentas/detalles/'+req.body.Cartera);
          }
        }
      }
   });
});

module.exports = router;
