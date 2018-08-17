// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var adminModel = require('../model/adminModel.js');
var model = new adminModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

router.get('/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/index', data: data, usuario: req.session.usuario});
});

router.get('/usuarios', function(req, res, next) {
	console.log('Clicando nos usuarios');
	model.GetUsuarios().then(data_usuarios => {
		data.usuarios = data_usuarios;
		console.log(data);
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/usuarios', data: data, usuario: req.session.usuario});
	});
});


module.exports = router;