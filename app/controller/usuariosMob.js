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
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/usuariosMob', data: data, usuario: req.session.usuario});
	});
});
router.get('/cadastro', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/usuarios_cadastroMob', data: data, usuario: req.session.usuario});
});
router.get('/login', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/usuarios_loginMob', data: data, usuario: req.session.usuario});
});
router.get('/editar/:id', function(req, res, next) {
	id = req.params.id;
	model.GetUsuario(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/usuarios_editar', data: data, usuario: req.session.usuario});
	});
});
router.get('/ver/:id', function(req, res, next) {
	id = req.params.id;
	model.GetUsuario(id, req.session.usuario.id).then(data_usuario => {
		data.perfil = data_usuario;
		model.GetPostagemByUser(id, req.session.usuario.id).then(data_postagens => {
			data.postagens = data_postagens;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/usuarios_verMob', data: data, usuario: req.session.usuario});
		});
	});
});
router.get('/contatos/', function(req, res, next) {
	model.GetUsuarioContatos(req.session.usuario.id).then(data => {
		data.usuario = req.session.usuario;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/usuarios_contatosMob', data: data, usuario: req.session.usuario});
	});
});
router.get('/grupos/', function(req, res, next) {
	model.GetUsuarioGrupos(req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/usuarios_gruposMob', data: data, usuario: req.session.usuario});
	});
});
router.get('/grupos/ver/:id', function(req, res, next) {
	id = req.params.id;
	model.GetGrupo(id, req.session.usuario.id).then(data_grupo => {
		data.grupo = data_grupo;
		model.GetUsuariosGrupo(id).then(data_usuarios => {
			data.usuarios = data_usuarios;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/usuarios_grupos_verMob', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/situacao/:id', function(req, res, next) {
	id = req.params.id;
	res.render(req.isAjaxRequest() == true ? 'api' : 'api', {html: 'usuarios/usuarios_situacaoMob', data: data, usuario: req.session.usuario});
});


router.get('/genero/:id', function(req, res, next) {
	id = req.params.id;
	res.render(req.isAjaxRequest() == true ? 'api' : 'api', {html: 'usuarios/usuarios_generoMob', data: data, usuario: req.session.usuario});
});

router.get('/faculdade/:id', function(req, res, next) {
	id = req.params.id;
	res.render(req.isAjaxRequest() == true ? 'api' : 'api', {html: 'usuarios/usuarios_faculdadeMob', data: data, usuario: req.session.usuario});
});

router.get('/ufcidade/:id', function(req, res, next) {
	id = req.params.id;
	res.render(req.isAjaxRequest() == true ? 'api' : 'api', {html: 'usuarios/usuarios_ufcidadeMob', data: data, usuario: req.session.usuario});
});


router.get('/alterar-senha/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/alterar_senhaMob', data: data, usuario: req.session.usuario});
});


router.get('/grupos/criar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/usuarios_grupos_criarMob', data: data, usuario: req.session.usuario});
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
	if(req.session.usuario.tipo == 2){
		model.GetUsuariosFaculdade(POST,req.session.usuario.id_faculdade, req.session.usuario.id).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'api', {html: 'usuarios/usuariosMob', data: data, usuario: req.session.usuario});
		});
	}else{
		POST.id_usuario = req.session.usuario.id;
		model.GetUsuarios(POST).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'api', {html: 'usuarios/usuariosMob', data: data, usuario: req.session.usuario});
		});
	}
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

router.post('/contatos/adicionar-varios', function(req, res, next) {
	POST = req.body;
	POST.id_usuario = req.session.usuario.id;
	model.InsertVariosContatos(POST).then(data=>{
		res.json(data);
	});
});


router.post('/contatos/adicionar-varios-alunos', function(req, res, next) {
	POST = req.body;
	POST.id_usuario = req.session.usuario.id;
	POST.id_faculdade = req.session.usuario.id_faculdade;

	model.AdicionarVariosAlunosUpdate(POST).then(data=>{
		res.json(data);
	});
});


router.post('/contatos/remover-varios-alunos', function(req, res, next) {
	POST = req.body;
	POST.id_usuario = req.session.usuario.id;
	POST.id_faculdade = req.session.usuario.id_faculdade;
	model.RemoverVariosAlunosUpdate(POST).then(data=>{
		res.json(data);
	});
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
	/*se foi atualizado o nome de murer ver se ninguém já o está utilizando*/
	if(POST.nome_murer != undefined){
		model.PesquisarUsuario(POST.nome_murer).then(id_usuario=>{

			if(id_usuario == ''){
				model.UpdateUsuario(POST).then(data=> {
					res.json(data);
				});
			}else{
				res.json('usuariojacadastrado');
			}
		})
	}else{
		model.UpdateUsuario(POST).then(data=> {
			res.json(data);
		});
	}
});


router.post('/atualizar/faculdade', function(req, res, next) {
	POST = req.body;
	model.UpdateUsuario(POST).then(data=> {
		model.UpdateUsuarioFaculdadeRelacao(POST).then(id_relacao=>{
			res.json(data);			
		});
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