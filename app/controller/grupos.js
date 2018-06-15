// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var GruposModel = require('../model/gruposModel.js');
var model = new GruposModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelectGrupo(req.session.usuario.id).then(data=> {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'grupos/grupos', data: data});
	});
});
	router.get('/criar', function(req, res, next) {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'grupos/grupos_criar', data: data});
	});
	router.get('/editar/:id', function(req, res, next) {
		id = req.params.id;
		model.GetGrupo(id).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'grupos/grupos_editar', data: data});
		});
	});

	// Metodos POST
	router.post('/desativar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
  		model.DesativarGrupo('grupos', POST).then(data=> {
  			res.json(data);
  		});
	});

module.exports = router;