// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var UsuariosModel = require('../model/usuariosModel.js');
var model = new UsuariosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelectUsuario().then(data=> {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios', data: data});
	});
});
	router.get('/cadastro', function(req, res, next) {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_cadastro', data: data});
	});
	router.get('/login', function(req, res, next) {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_login', data: data});
	});
	router.get('/editar/:id', function(req, res, next) {
		id = req.params.id;
		model.GetUsuario(id).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_editar', data: data});
		});
	});
	router.get('/ver/:id', function(req, res, next) {
		id = req.params.id;
		model.GetUsuario(id).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_ver', data: data});
		});
	});

	// Metodos POST
	router.post('/desativar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
  		model.DesativarUsuario('usuarios', POST).then(data=> {
  			res.json(data);
  		});
	});

module.exports = router;