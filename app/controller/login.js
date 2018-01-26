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


/* GET pagina de index. */
router.get('/', function(req, res, next) {
  if (control.Isset(req.session.id_usuario, false)) {
		model.Inicio().then(data => {
			res.render('login/index', {data: data});
		});
  } else {
		res.redirect('/sistema');
  }
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;

	// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
	POST.senha = control.Encrypt(POST.senha);
	query = 'SELECT id FROM usuarios WHERE login = ? AND senha = ?';
	array = [POST.login, POST.senha];
	
	// Adicione a query com scape(?) e os respectivos valores em um array simples
	connection.query(query, array, function (error, results, fields) {
	  if (error && query != '') console.log('ERROR SQL ------------- '+error+' ------------- SQL ERROR');
	  if (results.length > 0) {
			req.session.id_usuario = results[0].id;
			res.redirect('/sistema');
	  } else {
  		res.render('login/index', { erro: 'Login ou senha incorreto(s).', tipo_erro: 'login' });
	  }

	});
});

/* GET pagina de login. */
router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
  	console.log(err);
	});
	res.render('login/index', {});
});

module.exports = router;
