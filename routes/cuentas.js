var express = require('express');
var router = express.Router();

router.get('/crear', function(req, res, next) {
  res.render('cuentas_crear');
});

router.post('/crear', function(req, res, next) {
  req.flash('successMessage', 'La cuenta '+ req.body.first_name + ' se ha creado exitosamente.');
  res.redirect('/');
});

module.exports = router;
