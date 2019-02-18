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
	model.GetContatos(req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'chats/chats', data: data, usuario: req.session.usuario});
	});
});

router.get('/ver/:id', function(req, res, next) {
	id = req.params.id;
	model.GetMensagens(id, req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'chats/chats_interno', data: data, usuario: req.session.usuario, usuario_chat: id});
	});
});

router.get('/novidades/', function(req, res, next) {
	res.json('oi');
});

// POSTS
	router.post('/enviar/mensagem/', function(req, res, next) {
		POST = req.body;
		model.InsertMensagem(POST).then(data => {
			res.json(data);
		});
	});

module.exports = router;