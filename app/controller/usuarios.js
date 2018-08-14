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
	model.GetUsuario(id, req.session.usuario.id).then(data_usuario => {
		data.perfil = data_usuario;
		model.GetPostagemByUser(id, req.session.usuario.id).then(data_postagens => {
			data.postagens = data_postagens;
			console.log('********************* DADOS DO PERFIL ****************************');
			console.log(data);
			console.log('******************************************************************');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_ver', data: data, usuario: req.session.usuario});
		});
	});
});
router.get('/contatos/', function(req, res, next) {
	model.GetUsuarioContatos(req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_contatos', data: data, usuario: req.session.usuario});
	});
});
router.get('/grupos/', function(req, res, next) {
	model.GetUsuarioGrupos(req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_grupos', data: data, usuario: req.session.usuario});
	});
});
router.get('/grupos/ver/:id', function(req, res, next) {
	id = req.params.id;
	model.GetGrupo(id, req.session.usuario.id).then(data_grupo => {
		data.grupo = data_grupo;
		model.GetUsuariosGrupo(id).then(data_usuarios => {
			data.usuarios = data_usuarios;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_grupos_ver', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/alterar-senha/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/alterar_senha', data: data, usuario: req.session.usuario});
});


router.get('/grupos/criar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_grupos_criar', data: data, usuario: req.session.usuario});
});

// Metodos POST
router.post('/uploadfoto/', function(req, res, next) {
	POST = req.body;
	POST.id = req.session.usuario.id;
	model.UpdateFoto(POST).then(data => {
		res.json(data);
	});
});

router.post('/contatos/', function(req, res, next) {
	POST = req.body;
	model.GetUsuarios(POST).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios', data: data, usuario: req.session.usuario});
	});
});

router.post('/grupos/sair', function(req, res, next) {
	POST = req.body;
	model.SairGrupo(POST).then(data => {
		res.json(data);
	});
});

router.post('/grupos/entrar', function(req, res, next) {
	POST = req.body;
	model.EntrarGrupo(POST).then(data => {
		res.json(data);
	});
});

router.post('/contatos/adicionar', function(req, res, next) {
	POST = req.body;
	if(req.session.usuario.tipo == 2){
		data_insert = {id_faculdade: req.session.usuario.id_faculdade, id_aluno: POST.id_usuario2};
		model.GetUsuarioFaculdade(data_insert).then(alunonafaculdade => {
				//se retornar algum valor quer dizer que o aluno está na faculdade
				if(alunonafaculdade != ''){
					model.InsertContato(POST).then(data => {
						res.json(data);
					});
				}else{
					res.json([]);
				}				
			});
	}else{
		model.InsertContato(POST).then(data => {
			res.json(data);
		});
	}
});

router.post('/contatos/remover', function(req, res, next) {
	POST = req.body;
	model.DesativarContato(POST).then(data => {
		res.json(data);
	});
});

router.post('/grupos/adicionar/usuario', function(req, res, next) {
	POST = req.body;
	model.GetUsuarioMurer(POST).then(usuario => {
		if (usuario.length > 0) {
			data_insert = {id_usuario: usuario[0].id, id_grupo: POST.id_grupo};			
			model.GetUsuarioMurerGrupo(data_insert).then(usuarionogrupo =>{
					//se retornar algum valor quer dizer que o usuario está no grupo então não precisa cadastrar denovo
					if(usuarionogrupo == 0 || usuarionogrupo == ''){
						model.EntrarGrupo(data_insert).then(data => {
							res.json(data);
						});
					}else{
						res.json(data);
					}
				});				
		} else {
			res.json(data);
		}
	});
});

router.post('/grupos/adicionar', function(req, res, next) {
	POST = req.body;
	model.InsertGrupo(POST, {id_usuario: req.session.usuario.id}).then(data => {
		res.json(data);
	});
});

router.post('/grupos/usuario/desativar', function(req, res, next) {
	POST = req.body;
	model.DesativarUsuarioGrupo(POST).then(data => {
		res.json(data);
	});
});

router.post('/alterar-senha', function(req, res, next) {
// Recebendo o valor do post
POST = req.body;
POST.senha = control.Encrypt(POST.senha);
POST.id = req.session.usuario.id;
POST.senha_atual = control.Encrypt(POST.senha_atual);

model.GetUsuarioAlterarSenha(req.session.usuario.id,POST.senha_atual).then(data_usuario => {
	console.log('************* DADOS USUARIO *************');
	console.log(data_usuario);
	console.log('*****************************************');
	delete POST.senha_atual;
	if (data_usuario.length > 0){
		model.UpdateUsuario(POST).then(data => {
			control.SendMail(data_usuario[0].email,'Sua senha foi Atualizada em Muron',
				'Olá sua senha foi alterada com sucesso no Muron.',
				'Olá Sua senha foi alterada com sucesso no Muron. Segue abaixo as informações sobre sua conta.'+
				'<br><b>Login</b>:'+data_usuario[0].login+ 
				'<br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.');
			res.json(POST.id);
		});	
	} else {
		var erro = 'Senha Atual errada.';
		res.json('errorsenha');
	}

	});
});

router.post('/cadastro', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);
	model.CadastrarUsuario(POST).then(data => {
		console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGG data GGGGGGGGGGGGGGGGGGGGGGGGGGG');
		console.log(data);
		console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');

		var to = 'clebercavalheiro.000@gmail.com';
		var subject = 'Bem Vindo ao MurOn';
		var html = 'Bem vindo ao aplicativo preferido das faculdades e alunos. Segue abaixo as informações sobre sua conta. \
		<br> <b>Login: </b> <br> \
		<br> <b>Senha: </b> <br>Acesse via o link ';
		var text = 'Bem vindo ao aplicativo preferido das faculdades e alunos. Segue abaixo as informações:';
		control.SendMail(to, subject, html, text);
		res.json(data);
	});
});

router.post('/atualizar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('----------------------------- POST ATUALIZAR -----------------------');
	console.log(POST);
	console.log('--------------------------------------------------------------------');

	if(POST.nome_murer != undefined){
		console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& É NOME MURER &&&&&&&&&&&&&&&&&&&&&&');
		model.PesquisarUsuario(POST.nome_murer).then(id_usuario=>{
			console.log(id_usuario);
			if(id_usuario == ''){
				console.log('DDDDDDDDDDDDDDDDDDDD NÃO TEM ESSE NOME MURER AINDA DDDDDDDDDDDDDDDDDDDDDD');
				model.UpdateUsuario(POST).then(data=> {
					res.json(data);
				});
			}else{
				console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCC CAI AQUI NO JÁ CADASTRADO CCCCCCCCCCCCCCCCCCCCCCCCCCC');
				res.json('usuariojacadastrado');
			}
		})
	}else{
		console.log('***************************** NÃO É NOME DE MURER *********************');
		model.UpdateUsuario(POST).then(data=> {
			res.json(data);
		});
	}


});

router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarUsuario(POST).then(data=> {
		res.json(data);
	});
});

module.exports = router;