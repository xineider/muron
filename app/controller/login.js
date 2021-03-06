// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var LoginModel = require('../model/loginModel.js');
var model = new LoginModel;
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


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);
	model.Login(POST).then(data => {
		if(data.length > 0){
			model.VerificarValidado(data[0].id).then(dataVerificado =>{
				if(dataVerificado[0].validacao == 0){
					model.VerificarDeletado(data[0].id).then(dataDeletado => {
						if(dataDeletado == ''){
							req.session.usuario = {};
							req.session.usuario.id = data[0].id;
							req.session.usuario.hash_login = data[0].hash_login;
							req.session.usuario.tipo = data[0].tipo;
							req.session.usuario.id_faculdade = data[0].id_faculdade;
							req.session.usuario.nome_murer = data[0].nome_murer;
							req.session.usuario.email = data[0].email;
							res.redirect('/sistema');

							/*Usuário deletado*/
						}else{
							res.render('login/index', { erro: 'Usuário banido do aplicativo pela Administração', tipo_erro: 'login', usuario: req.session.usuario });
						}
					});

				/*Usuário não verificado ou seja é parceiro aguardando validação para acessar*/
				}else if(dataVerificado[0].validacao == 1){
					res.render('login/index', { alertaAcesso: 'Agora é só aguardar o e-mail de confirmação de parceria com o Muron.', tipo_alerta: 'login', iconeAlerta:'fa-handshake-o', usuario: req.session.usuario });
					/*Usuário parceiro não aceito pela Administração*/
				}else if(dataVerificado[0].validacao == 2){
					res.render('login/index', { erro: 'No momento não temos disponibilidade para este tipo de parceria.', tipo_erro: 'login', usuario: req.session.usuario });
					/*Caso de algum problema de adicionar mais validações ele ter onde entrar no if*/
				}else{
					res.render('login/index', { erro: 'Problemas no Servidor de resposta.', tipo_erro: 'login', usuario: req.session.usuario });
				}

			});
			/*Não existe login ou senha no banco*/
		}else{
			res.render('login/index', { erro: 'Login ou senha incorreto(s).', tipo_erro: 'login', usuario: req.session.usuario });
		};
	});
});



router.post('/teste_entrar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);
	model.Login(POST).then(data => {
		if(data.length > 0){
			model.VerificarValidado(data[0].id).then(dataVerificado =>{
				if(dataVerificado[0].validacao == 0){
					model.VerificarDeletado(data[0].id).then(dataDeletado => {
						if(dataDeletado == ''){
							req.session.usuario = {};
							req.session.usuario.id = data[0].id;
							req.session.usuario.hash_login = data[0].hash_login;
							req.session.usuario.tipo = data[0].tipo;
							req.session.usuario.id_faculdade = data[0].id_faculdade;
							req.session.usuario.nome_murer = data[0].nome_murer;
							req.session.usuario.email = data[0].email;
							res.redirect('/sistema');

							/*Usuário deletado*/
						}else{
							res.render('login/index', { erro: 'Usuário banido do aplicativo pela Administração', tipo_erro: 'login', usuario: req.session.usuario });
						}
					});

				/*Usuário não verificado ou seja é parceiro aguardando validação para acessar*/
				}else if(dataVerificado[0].validacao == 1){
					res.render('login/index', { alertaAcesso: 'Agora é só aguardar o e-mail de confirmação de parceria com o Muron.', tipo_alerta: 'login', iconeAlerta:'fa-handshake-o', usuario: req.session.usuario });
					/*Usuário parceiro não aceito pela Administração*/
				}else if(dataVerificado[0].validacao == 2){
					res.render('login/index', { erro: 'No momento não temos disponibilidade para este tipo de parceria.', tipo_erro: 'login', usuario: req.session.usuario });
					/*Caso de algum problema de adicionar mais validações ele ter onde entrar no if*/
				}else{
					res.render('login/index', { erro: 'Problemas no Servidor de resposta.', tipo_erro: 'login', usuario: req.session.usuario });
				}

			});
			/*Não existe login ou senha no banco*/
		}else{
			res.render('login/index', { erro: 'Login ou senha incorreto(s).', tipo_erro: 'login', usuario: req.session.usuario });
		};
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
