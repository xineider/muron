// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var adminModel = require('../model/adminModel.js');
var model = new adminModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

router.get('/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/index', data: data, usuario: req.session.usuario});
});

router.get('/usuarios', function(req, res, next) {
	console.log('Clicando nos usuarios');
	model.GetUsuarios().then(data_usuarios => {
		data.usuarios = data_usuarios;
		console.log(data);
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/usuarios', data: data, usuario: req.session.usuario});
	});
});

router.get('/permissao-faculdades', function(req, res, next) {
	console.log('Clicando nos usuarios');
	model.GetParceirosNaoValidados().then(data_usuarios => {
		data.usuarios = data_usuarios;
		console.log(data);
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/permissao_faculdade', data: data, usuario: req.session.usuario});
	});
});


router.post('/aprovarUsuario/', function(req, res, next) {
	POST = req.body;
	var emailParceiro;

	model.AprovarUsuario(POST).then(data => {
		model.GetUsuarioById(POST.id).then(data_usuario => {
			/*assim que aprovar manda email para o usuario informando sobre ser aprovado e mostrando o login do mesmo*/
			control.SendMail(data_usuario[0].email,'Você foi aprovado como parceiro no Muron',
				'Parabéns, você agora é parceiro do Muron, você pode acessar pelo site www.muron.com.br ou pelo aplicativo de celular',
				'Parabéns,você agora é parceiro do Muron, você pode acessar pelo site <a href="http://www.muron.com.br">www.muron.com.br</a> ou pelo aplicativo do celular, aqui estão seus dados de acesso:'+
				'<br><b>Login</b>:'+data_usuario[0].nome_murer+ 
				'<br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.');

			res.json(data);
		});			
	});
});


module.exports = router;