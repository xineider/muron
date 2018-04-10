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
	router.get('/alunos/relacao', function(req, res, next) {
		model.GetRelacao(req.session.usuario.id).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'faculdades/faculdades_relacao', data: data, usuario: req.session.usuario});
		});
	});
	// Metodos POST
	router.post('/alunos/relacao/cadastrar', function(req, res, next) {
		POST = req.body;
  		model.InsertRelacao(POST).then(data=> {
  			res.json(data);
  		});
	});
	router.post('/alunos/relacao/desativar', function(req, res, next) {
		POST = req.body;
  		model.DesativarRelacao(POST).then(data=> {
  			res.json(data);
  		});
	});

module.exports = router;
