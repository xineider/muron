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
	model.GetUsuarios().then(data_usuarios => {
		data.usuarios = data_usuarios;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/usuarios', data: data, usuario: req.session.usuario});
	});
});

router.get('/permissao-faculdades', function(req, res, next) {
	/*pego as faculdades que ainda não foram validadas*/
	model.GetParceirosNaoValidados().then(data_usuarios => {
		data.usuarios = data_usuarios;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/permissao_faculdade', data: data, usuario: req.session.usuario});
	});
});

/*login do aplicativo quando sair e entra denovo*/
router.get('/loginagain', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorLimpo', {html: 'inicio/login_fake', data: data, usuario: req.session.usuario});
});


router.get('/usuario-faculdade', function(req, res, next) {
	model.GetUsuariosFaculdade().then(data_usuarios => {
		data.usuarios = data_usuarios;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/usuario_faculdade', data: data, usuario: req.session.usuario});
	});
});

router.get('/cadastro-faculdade', function(req, res, next) {
	model.GetFaculdadesCadastradas().then(data_faculdades => {
		data.faculdades = data_faculdades;
		data.link_sistema = '/sistema';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/cadastro_faculdade', data: data, usuario: req.session.usuario});
	});
});

router.get('/adicionar-faculdade', function(req, res, next) {
	data.link_sistema = '/sistema';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/adicionar_faculdade', data: data, usuario: req.session.usuario});
});

router.get('/cadastro-faculdade-inep', function(req, res, next) {
	model.GetFaculdadesInep().then(data_faculdades_inep => {
		data.faculdades_inep = data_faculdades_inep;
		data.link_sistema = '/sistema';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/cadastro_faculdade_inep', data: data, usuario: req.session.usuario});
	});
});


router.get('/cadastro-cursos', function(req, res, next) {
	model.GetCursosPorAtivacao().then(data_cursos => {
		data.cursos = data_cursos;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/cadastro_curso', data: data, usuario: req.session.usuario});
	});
});


router.get('/editar-faculdade/:id', function(req, res, next) {
	id = req.params.id;
	model.GetFaculdadePorId(id).then(data_faculdade=>{
		data.faculdade = data_faculdade;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/editar_faculdade', data: data, usuario: req.session.usuario});
	});
});


router.get('/editar-curso/:id', function(req, res, next) {
	id = req.params.id;
	model.GetCursoPorId(id).then(data_curso=>{
		data.curso = data_curso;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'admin/editar_curso', data: data, usuario: req.session.usuario});
	});
});



router.post('/aprovarUsuario/', function(req, res, next) {
	POST = req.body;

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



router.post('/alterarSenhaUsuario/', function(req, res, next) {
	POST = req.body;
	
	model.GetUsuarioById(POST.id).then(data_usuario=>{
		/*gera uma nova senha e e coloca no post para encriptar*/
		var senha = Math.random().toString(36).substr(2, 8);
		POST.senha = senha;


		model.AlterarSenhaUsuario(POST).then(data_alterar_senha=>{

			control.SendMail(data_usuario[0].email,'Senha Alterada em Muron',
				'Olá, sua senha foi alterada pelo Administrador no Muron segue sua nova senha: ' + senha + 
				'<br>Recomendamos assim que entrar alterar esta senha gerada ao clicar no seu perfil e clicar no botão "Alterar Senha" no fim da página do perfil.' + 
				'<br><br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.',
				'Olá, sua senha foi alterada pelo Administrador no Muron segue sua nova senha: '+ senha +
				'<br>Recomendamos assim que entrar alterar esta senha gerada ao clicar no seu perfil e clicar no botão "Alterar Senha" no fim da página do perfil.'+
				'<br><br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.');
			res.json('alterado_senha');
		});
	});
});

router.post('/cadastrar/usuario', function(req, res, next) {
	var post = req.body;
	var post_limpo = model.VerificarSenha(post);
	var nome_facul = post_limpo.nome_faculdade;
	var nome_curso = post_limpo.nome_curso;
	var data_insert;
	delete post_limpo.nome_faculdade;
	delete post_limpo.nome_curso;

	if (Object.keys(post_limpo).length > 0) {
		/*Para identificar se o nome do murer for muron, se tiver muron no nome não cadastrar*/
		model.VerSeMuron(post_limpo.nome_murer).then(nome_murer_muron => {
			if(nome_murer_muron == ''){

				/*Vê se tem faculdade previamente cadastrada, se não cadastra*/
				if(post_limpo.id_faculdade == ''){
					model.CadastrarFaculdadeCasoNaoExistir(nome_facul).then(id_faculdade_criada =>{
						post_limpo.id_faculdade = id_faculdade_criada;

						/*Vê se não tem o curso previamente cadastrado, se não cadastra*/
						if(post_limpo.id_curso == ''){
							model.CadastrarCursoCasoNaoExistir(nome_curso).then(id_curso_criado =>{
								post_limpo.id_curso = id_curso_criado;

								model.CadastrarUsuario(post_limpo).then(id_usuario => {
									if(id_usuario != ''){
										data_insert = {id_faculdade: id_faculdade_criada,id_aluno:id_usuario};
										model.CadastrarRelacaoAlunoFaculdade(data_insert).then(data =>{
											res.json(data);
										});

									}else{
										res.json(['muron_existente']);
									}
								});	

							});	

							/*Quer dizer que já existe o curso, então pode cadastrar o usuário*/
						}else{

							model.CadastrarUsuario(post_limpo).then(id_usuario => {
								if(id_usuario != ''){
									data_insert = {id_faculdade: id_faculdade_criada,id_aluno:id_usuario};
									model.CadastrarRelacaoAlunoFaculdade(data_insert).then(data =>{
										res.json(data);
									});

								}else{
									res.json(['muron_existente']);
								}
							});
						}	
					});

					/*Quer dizer que já existe faculdade*/

				}else{

					model.FaculdadeRecorrenciaAluno(post_limpo.id_faculdade).then(id_faculdade_recorrencia =>{

						/*Vê se não tem o curso previamente cadastrado, se não cadastra*/
						if(post_limpo.id_curso == ''){

							model.CadastrarCursoCasoNaoExistir(nome_curso).then(id_curso_criado =>{
								post_limpo.id_curso = id_curso_criado;

								model.CadastrarUsuario(post_limpo).then(id_usuario => {
									if(id_usuario != ''){
										data_insert = {id_faculdade: post_limpo.id_faculdade,id_aluno:id_usuario};
										model.CadastrarRelacaoAlunoFaculdade(data_insert).then(data =>{
											res.json(data);
										});
									}else{
										res.json(['muron_existente']);
									}
								});	

							});


							/*Quer dizer que já existe curso*/
						}else{
							model.CadastrarUsuario(post_limpo).then(id_usuario => {
								if(id_usuario != ''){
									data_insert = {id_faculdade: post_limpo.id_faculdade, id_aluno: id_usuario};
									model.CadastrarRelacaoAlunoFaculdade(data_insert).then(data =>{
										res.json(data);
									});
								}else{
									res.json(['muron_existente']);
								}
							});
						}
					});

				}

				/*Quer dizer que o nome possui muron nele*/
			}else{
				res.json(['possui_muron']);
			};			
		});
	} else {
		res.json(['dado_invalido']);
	}
});


router.post('/cadastrar-faculdade', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.ativacao = 2;
	POST.recorrencia = 0;
	model.CadastrarFaculdade(POST).then(data=> {
		res.json(data);
	});
});



router.post('/desativar-faculdade', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarFaculdade(POST).then(data=> {
		res.json(data);
	});
});

router.post('/desativar-curso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarCurso(POST).then(data=> {
		res.json(data);
	});
});


router.post('/editar-faculdade', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.AtualizarFaculdade(POST).then(data=> {
		res.json(data);
	});
});



router.post('/editar-curso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.AtualizarCurso(POST).then(data=> {
		res.json(data);
	});
});




module.exports = router;