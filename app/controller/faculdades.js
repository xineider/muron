// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var FaculdadesModel = require('../model/faculdadesModel.js');
var model = new FaculdadesModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelectFaculdade().then(data=> {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'faculdades/faculdades', data: data, usuario: req.session.usuario});
	});
});
	router.get('/criar', function(req, res, next) {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'faculdades/faculdades_criar', data: data, usuario: req.session.usuario});
	});
	router.get('/editar/:id', function(req, res, next) {
		id = req.params.id;
		model.GetFaculdade(id).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'faculdades/faculdades_editar', data: data, usuario: req.session.usuario});
		});
	});
	router.get('/ver/:id', function(req, res, next) {
		id = req.params.id;
		model.GetFaculdade(id).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'faculdades/faculdades_ver', data: data, usuario: req.session.usuario});
		});
	});

	// Metodos POST
	router.post('/desativar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
  		model.DesativarFaculdade('faculdades', POST).then(data=> {
  			res.json(data);
  		});
	});

module.exports = router;
