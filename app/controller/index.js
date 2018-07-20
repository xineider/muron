// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var IndexModel = require('../model/indexModel.js');
var model = new IndexModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.VeifyViews(req.session.usuario.id).then(ret => {
		if (req.session.usuario.tipo == 1) {
			data_projeto = {id_categoria:2, id_faculdade:req.session.usuario.id_faculdade, id_usuario:req.session.usuario.id };
			model.GetCategoriasAtualizacoes(data_projeto).then(cat_proj=> {
				data.categorias = cat_proj;
				console.log(',,,,,,,,,,,, Dados das Categorias ,,,,,,,,,,,');
				console.log(data);
				console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,');

				model.GetPostagensTodas(req.session.usuario.id).then(data_postagens=> {
					data.postagens = data_postagens;
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/index', data: data, usuario: req.session.usuario});
				});
			});
		} else if(req.session.usuario.tipo == 2){
			data_insert = {id_faculdade:req.session.usuario.id_faculdade, id_usuario:req.session.usuario.id};
			data_projeto = {id_categoria:2, id_faculdade:req.session.usuario.id_faculdade, id_usuario:req.session.usuario.id };
			data_estagio = {id_categoria:1, id_faculdade:req.session.usuario.id_faculdade, id_usuario:req.session.usuario.id};
			data_divulgacao = {id_categoria:4, id_faculdade:req.session.usuario.id_faculdade, id_usuario:req.session.usuario.id}

			model.GetCategoriasAtualizacoesFaculdade(data_projeto).then(cat_proj=> {
				data.categorias = cat_proj;
				model.GetCategoriasAtualizacoesFaculdade(data_estagio).then(cat_est=> {
					data.categorias.push(cat_est[0]);					
					model.GetCategoriasAtualizacoesFaculdade(data_divulgacao).then(cat_div=> {
						data.categorias.push(cat_div[0]);
						model.GetPostagensTodasFaculdade(data_insert).then(data_postagens=>{
							data.postagens = data_postagens;
							console.log(data);				
							res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/index', data: data, usuario: req.session.usuario});
						});
					});
				});
			});
		} else {
			model.GetCategorias().then(data=> {
				model.GetPostagens(req.session.usuario.id).then(data_postagens => {
					data.postagens = data_postagens;
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/parceiro', data: data, usuario: req.session.usuario});
				});
			});
		}
	});
});

/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.Login(POST).then(data => {
		console.log(data);
		if (data.length > 0) {
			req.session.id_usuario = data[0].id;
			res.redirect('/sistema');
		} else {
			res.render('login/index', { erro: 'Login ou senha incorreto(s).', tipo_erro: 'login' });
		}
	});
	
});

module.exports = router;
