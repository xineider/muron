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

router.get('/ver', function(req, res, next) {
	model.GetFaculdadeVer(req.session.usuario.id).then(data_faculdade => {
		console.log('kkkkkkkkkkkk ID do Usuario kkkkkkkkkkkkk');
		console.log(req.session.usuario.id);
		console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');


		console.log('!!!!!!!!!!! Dados da Faculdade !!!!!!!!!!!');
		console.log(data_faculdade);
		console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

		console.log('Não achou o nome da Faculdade na relação');
		console.log(data_faculdade == 1);
		console.log('Nome da Faculdade nulo na tabela usuarios');
		console.log(data_faculdade == 2);

		// if(data_faculdade != false)
			if (data_faculdade != 1 && data_faculdade != 2) {
				data.perfil = data_faculdade;
				model.GetPostagemByFaculdade(data.perfil[0].id).then(data_postagens => {
					data.postagens = data_postagens;
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_ver', data: data, usuario: req.session.usuario});
				});
			} else if(data_faculdade < 3){
				// res.redirect('/sistema/');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_ver', data: data, usuario: req.session.usuario,error:data_faculdade});
			}
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
