// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var chatsModel = require('../model/chatsModel.js');
var model = new chatsModel;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelecioneChats().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'chats/chats', data: data, usuario: req.session.usuario});
	});
});

router.get('/novidades/', function(req, res, next) {
	res.json('oi');
});

// POSTS
	router.post('/mensagens/', function(req, res, next) {
		POST = req.body;
		console.log('<=======================================>');
		console.log(POST);
		console.log('<=======================================>');
		model.SelecioneMensagens(POST.id, POST.id_usuario).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'chats/chats_conteudo', data: data});
		});
	});

module.exports = router;