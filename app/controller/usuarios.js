// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var UsuariosModel = require('../model/usuariosModel.js');
var model = new UsuariosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelectUsuario().then(data=> {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios', data: data, usuario: req.session.usuario});
	});
});
	router.get('/cadastro', function(req, res, next) {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_cadastro', data: data, usuario: req.session.usuario});
	});
	router.get('/login', function(req, res, next) {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_login', data: data, usuario: req.session.usuario});
	});
	router.get('/editar/:id', function(req, res, next) {
		id = req.params.id;
		model.GetUsuario(id).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_editar', data: data, usuario: req.session.usuario});
		});
	});
	router.get('/ver/:id', function(req, res, next) {
		id = req.params.id;
		model.GetUsuario(id).then(data_usuario => {
			data.perfil = data_usuario;
			model.GetPostagemByUser(id, req.session.usuario.id).then(data_postagens => {
				data.postagens = data_postagens;
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_ver', data: data, usuario: req.session.usuario});
			});
		});
	});
	router.get('/contatos/', function(req, res, next) {
		model.GetUsuarioContatos(req.session.usuario.id).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_contatos', data: data, usuario: req.session.usuario});
		});
	});

	// Metodos POST
	router.post('/contatos/', function(req, res, next) {
		POST = req.body;
		model.GetUsuarios(POST).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios', data: data, usuario: req.session.usuario});
		});
	});
	router.post('/contatos/adicionar', function(req, res, next) {
		POST = req.body;
		model.InsertContato(POST).then(data => {
			res.json(data);
		});
	});
	router.post('/cadastro', function(req, res, next) {
// Recebendo o valor do post
		POST = req.body;
		POST.senha = control.Encrypt(POST.senha);
		model.CadastrarUsuario(POST).then(data => {
			var to = 'clebercavalheiro.000@gmail.com';
			var subject = 'Bem Vindo ao MurOn';
			var html = 'Bem vindo ao aplicativo preferido das faculdades e alunos. Segue abaixo as informações sobre sua conta. \
									<br> <b>Login: leopeixe42</b> <br> \
						 			<br> <b>Senha: rr43233</b> <br>Acesse via o link "bla"';
			var text = 'Bem vindo ao sistema de tarefas Optima. Seu login é: leopeixe42 e sua senha é rr43233. Acesse via o link "bla"';
			control.SendMail(to, subject, html, text);
			res.json(data);
		});
	});
	router.post('/atualizar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
  		model.UpdateUsuario(POST).then(data=> {
  			res.json(data);
  		});
	});
	router.post('/desativar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
  		model.DesativarUsuario(POST).then(data=> {
  			res.json(data);
  		});
	});

module.exports = router;