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
  	if (req.session.usuario.tipo == 1 || req.session.usuario.tipo == 2) {	
		model.GetCategorias().then(data=> {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/index', data: data, usuario: req.session.usuario});
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

/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.Login(POST).then(data => {
	  if (results.length > 0) {
			req.session.id_usuario = results[0].id;
			res.redirect('/sistema');
	  } else {
  		res.render('login/index', { erro: 'Login ou senha incorreto(s).', tipo_erro: 'login' });
	  }
	});
	
});

module.exports = router;
