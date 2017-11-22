// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	if (typeof req.session.id_usuario != 'undefined' && req.session.id_usuario != 0) {
		res.redirect('/sistema');
	} else {
		res.render('login/index', {});
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

/* GET pagina de login. */
router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
  	console.log(err);
	});
	res.render('login/index', {});
});

module.exports = router;
