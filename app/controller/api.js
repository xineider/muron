
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var apiModel = require('../model/apiModel.js');
var model = new apiModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */

router.get('/get-faculdades',function(req,res,next){
	model.SelecionarFaculdades().then(data=> {
		res.json(data);
	});
});

router.get('/pesquisar/faculdade/:nomeFaculdade', function(req, res, next) {

	nomeFaculdade = req.params.nomeFaculdade;
	model.PesquisarFaculdade(nomeFaculdade).then(data => {
		res.json(data);
	});
});

router.get('/pesquisar/curso/:nomeCurso', function(req, res, next) {

	nomeCurso = req.params.nomeCurso;


	model.PesquisarCurso(nomeCurso).then(data => {
		res.json(data);
	});
});


router.post('/', function(req, res, next) {
	res.json(0);
});

router.post('/recuperar/senha', function(req, res, next) {
	var post = req.body;
	var data_insert;
	var nova_senha;
	model.PesquisarEmail(post.email).then(idEmail => {
		if(idEmail != ''){
			nova_senha = Math.random().toString(36).substring(7);
			data_insert = {id: idEmail[0].id, senha: nova_senha};
			model.AlterarSenhaUsuarioPorId(data_insert).then(data_alterado_sucesso =>{
				var html = "Olá, você está recebendo este e-mail pois pediu para recuperar sua senha"+
				"<br>Sua nova senha no Muron é: "+nova_senha+
				"<br>Caso não pediu para recuperar a sua senha entre em contato com o Suporte pelo e-mail <a href='mailto:suporte@muron.com.br'>suporte@muron.com.br</a>"+
				'<br><br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.';
				var text = "Olá, você está recebendo este e-mail pois pediu para recuperar sua senha"+
				"<br>Sua nova senha no Muron é: "+nova_senha+
				"<br>Caso não pediu para recuperar a sua senha entre em contato com o Suporte pelo e-mail <a href='mailto:suporte@muron.com.br'>suporte@muron.com.br</a>"+
				'<br><br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.';
				control.SendMail(post.email, 'Recuperação de Senha - MurOn', html, text);				
				res.json(data_alterado_sucesso);
			});

		}else{
			res.json(['email_nao_cadastrado']);
		}
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
											var html = "<p>Obrigado <b>"+post.nome+"</b> por se cadastrar no MurOn seu login é: "+post.nome_murer+"</p><p>Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para <a href='mailto:suporte@muron.com.br'>suporte@muron.com.br</a></p><p>Por-favor não responda este e-mail pois ele é enviado automaticamente. </p><p>Obrigado! <b>Equipe MurOn</b></p>";
											var text = "Obrigado "+post.nome+" por se cadastrar no MurOn seu login é: "+post.nome_murer+"\
											Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para suporte@muron.com.br\
											Por-favor não responda este e-mail pois ele é enviado automaticamente.\
											Obrigado! Equipe MurOn";
											control.SendMail(post.email, 'Cadastrado em MurOn com Sucesso!!', html, text);
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
										var html = "<p>Obrigado <b>"+post.nome+"</b> por se cadastrar no MurOn seu login é: "+post.nome_murer+"</p><p>Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para <a href='mailto:suporte@muron.com.br'>suporte@muron.com.br</a></p><p>Por-favor não responda este e-mail pois ele é enviado automaticamente. </p><p>Obrigado! <b>Equipe MurOn</b></p>";
										var text = "Obrigado "+post.nome+" por se cadastrar no MurOn seu login é: "+post.nome_murer+"\
										Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para suporte@muron.com.br\
										Por-favor não responda este e-mail pois ele é enviado automaticamente.\
										Obrigado! Equipe MurOn";
										control.SendMail(post.email, 'Cadastrado em MurOn com Sucesso!!', html, text);
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
											var html = "<p>Obrigado <b>"+post.nome+"</b> por se cadastrar no MurOn seu login é: "+post.nome_murer+"</p><p>Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para <a href='mailto:suporte@muron.com.br'>suporte@muron.com.br</a></p><p>Por-favor não responda este e-mail pois ele é enviado automaticamente. </p><p>Obrigado! <b>Equipe MurOn</b></p>";
											var text = "Obrigado "+post.nome+" por se cadastrar no MurOn seu login é: "+post.nome_murer+"\
											Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para suporte@muron.com.br\
											Por-favor não responda este e-mail pois ele é enviado automaticamente.\
											Obrigado! Equipe MurOn";
											control.SendMail(post.email, 'Cadastrado em MurOn com Sucesso!!', html, text);
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
										var html = "<p>Obrigado <b>"+post.nome+"</b> por se cadastrar no MurOn seu login é: "+post.nome_murer+"</p><p>Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para <a href='mailto:suporte@muron.com.br'>suporte@muron.com.br</a></p><p>Por-favor não responda este e-mail pois ele é enviado automaticamente. </p><p>Obrigado! <b>Equipe MurOn</b></p>";
										var text = "Obrigado "+post.nome+" por se cadastrar no MurOn seu login é: "+post.nome_murer+"\
										Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para suporte@muron.com.br\
										Por-favor não responda este e-mail pois ele é enviado automaticamente.\
										Obrigado! Equipe MurOn";
										control.SendMail(post.email, 'Cadastrado em MurOn com Sucesso!!', html, text);
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


router.post('/entrar_sistema', function(req, res, next) {
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
							
							res.send({result: 'redirect', url:'/sistema'});
							// res.redirect('/sistema');

							/*Usuário deletado*/
						}else{
							res.send({result: 'banido', mensagem:'Usuário banido do aplicativo pela Administração',erro:'warn'});
							// res.render('login/index', { erro: 'Usuário banido do aplicativo pela Administração', tipo_erro: 'login', usuario: req.session.usuario });
						}
					});

					/*Usuário não verificado ou seja é parceiro aguardando validação para acessar*/
				}else if(dataVerificado[0].validacao == 1){
					res.send({result: 'aguardarparceria', mensagem:'Agora é só aguardar o e-mail de confirmação de parceria com o Muron.',erro:'alert'});
					// res.render('login/index', { alertaAcesso: 'Agora é só aguardar o e-mail de confirmação de parceria com o Muron.', tipo_alerta: 'login', iconeAlerta:'fa-handshake-o', usuario: req.session.usuario });
					/*Usuário parceiro não aceito pela Administração*/
				}else if(dataVerificado[0].validacao == 2){
					res.send({result: 'parcerianegada', mensagem:'No momento não temos disponibilidade para este tipo de parceria.',erro:'warn'});
					// res.render('login/index', { erro: 'No momento não temos disponibilidade para este tipo de parceria.', tipo_erro: 'login', usuario: req.session.usuario });
					/*Caso de algum problema de adicionar mais validações ele ter onde entrar no if*/
				}else{
					res.send({result: 'servidorresposta', mensagem:'Problemas no Servidor de resposta.',erro:'warn'});
					// res.render('login/index', { erro: 'Problemas no Servidor de resposta.', tipo_erro: 'login', usuario: req.session.usuario });
				}

			});
			/*Não existe login ou senha no banco*/
		}else{
			res.send({result: 'loginerrado', mensagem:'Login ou senha incorreto(s).',erro:'warn'});
			// res.render('login/index', { erro: 'Login ou senha incorreto(s).', tipo_erro: 'login', usuario: req.session.usuario });
		};
	});
});


router.post('/cadastrar/parceiro', function(req, res, next) {
	var post = req.body;
	var post_limpo = model.VerificarSenha(post);
	var nome_facul;

	if(post_limpo.nome_faculdade != ''){
		nome_facul = post_limpo.nome_faculdade;
		delete post_limpo.nome_faculdade;
	}
	var data_insert;
	post_limpo.validacao = 1;
	

	if (Object.keys(post_limpo).length > 0) {
		/*Para identificar se o nome do murer for muron, se tiver muron no nome não cadastrar*/
		model.VerSeMuron(post_limpo.nome_murer).then(nome_murer_muron => {
			if(nome_murer_muron == ''){

				if(post_limpo.tipo == 2){
					if(post_limpo.id_faculdade == ''){
						model.CadastrarFaculdadeCasoNaoExistir(nome_facul).then(id_faculdade_criada =>{
							post_limpo.id_faculdade = id_faculdade_criada;
							model.CadastrarParceiro(post_limpo).then(id_parceiro => {
								var html = "<p>Obrigado <b>"+post.nome+"</b> por se cadastrar no MurOn, seu perfil está sendo avaliado e em instantes será liberado pelo sistema para você poder usufruir do MurOn, o seu login é: "+post.nome_murer+"</p><p>Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para <a href='mailto:suporte@muron.com.br'>suporte@muron.com.br</a></p><p>Por-favor não responda este e-mail pois ele é enviado automaticamente. </p><p>Obrigado! <b>Equipe MurOn</b></p>";
								var text = "Obrigado "+post.nome+" por se cadastrar no MurOn, seu perfil está sendo avaliado e em instantes será liberado pelo sistema para você poder usufruir do MurOn, o seu login é: "+post.nome_murer+"\
								Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para suporte@muron.com.br\
								Por-favor não responda este e-mail pois ele é enviado automaticamente.\
								Obrigado! Equipe MurOn";
								control.SendMail(post.email, 'Cadastrado em MurOn com Sucesso!!', html, text);
								res.json(id_parceiro);
							});						
						});

					}else{
						model.VerSeExisteParceiroFaculdade(post_limpo.id_faculdade).then(temParceiro=>{
							if(temParceiro == ''){
								model.CadastrarParceiro(post_limpo).then(id_parceiro => {
									var html = "<p>Obrigado <b>"+post.nome+"</b> por se cadastrar no MurOn, seu perfil está sendo avaliado e em instantes será liberado pelo sistema para você poder usufruir do MurOn, o seu login é: "+post.nome_murer+"</p><p>Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para <a href='mailto:suporte@muron.com.br'>suporte@muron.com.br</a></p><p>Por-favor não responda este e-mail pois ele é enviado automaticamente. </p><p>Obrigado! <b>Equipe MurOn</b></p>";
									var text = "Obrigado "+post.nome+" por se cadastrar no MurOn, seu perfil está sendo avaliado e em instantes será liberado pelo sistema para você poder usufruir do MurOn, o seu login é: "+post.nome_murer+"\
									Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para suporte@muron.com.br\
									Por-favor não responda este e-mail pois ele é enviado automaticamente.\
									Obrigado! Equipe MurOn";
									control.SendMail(post.email, 'Cadastrado em MurOn com Sucesso!!', html, text);
									res.json(id_parceiro);
								});
							}else{
								/*Dizer Resposta que já existe gerente para aquela faculdade*/
								res.json(['possui_gerente']);
							}
						});						
					}
				}else{
					model.CadastrarParceiro(post_limpo).then(id_parceiro => {
						var html = "<p>Obrigado <b>"+post.nome+"</b> por se cadastrar no MurOn, seu perfil está sendo avaliado e em instantes será liberado pelo sistema para você poder usufruir do MurOn, o seu login é: "+post.nome_murer+"</p><p>Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para <a href='mailto:suporte@muron.com.br'>suporte@muron.com.br</a></p><p>Por-favor não responda este e-mail pois ele é enviado automaticamente. </p><p>Obrigado! <b>Equipe MurOn</b></p>";
						var text = "Obrigado "+post.nome+" por se cadastrar no MurOn, seu perfil está sendo avaliado e em instantes será liberado pelo sistema para você poder usufruir do MurOn, o seu login é: "+post.nome_murer+"\
						Se você está com dificuldades de acessar o MurOn por-favor enviar e-mail para suporte@muron.com.br\
						Por-favor não responda este e-mail pois ele é enviado automaticamente.\
						Obrigado! Equipe MurOn";
						control.SendMail(post.email, 'Cadastrado em MurOn com Sucesso!!', html, text);
						res.json(id_parceiro);
					});
				}

			}else{
				res.json(['possui_muron']);
			};
		});
	} else {
		res.json(['dado_invalido']);
	}
});
module.exports = router;
