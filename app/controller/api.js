
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
	console.log('cai aqui no get-faculdades');
	model.SelecionarFaculdades().then(data=> {
		console.log('============== FACULDADES DO CONTROLLER =================');
		console.log(data);
		console.log('=========================================================');
		res.json(data);
	});
});

router.get('/pesquisar/faculdade/:nomeFaculdade', function(req, res, next) {

	nomeFaculdade = req.params.nomeFaculdade;
	console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFF NOME FACULDADE FFFFFFFFFFFFFFFFFFFFFFF');
	console.log(nomeFaculdade);
	console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');

	model.PesquisarFaculdade(nomeFaculdade).then(data => {
		console.log('========================= procurar faculdade ===================');
		console.log(data);
		console.log('===============================================================');
		res.json(data);
	});
});

router.get('/pesquisar/curso/:nomeCurso', function(req, res, next) {

	nomeCurso = req.params.nomeCurso;
	console.log('CCCCCCCCCCCCCCCCCCCCCCC NOME CURSO CCCCCCCCCCCCCCCCCCCC');
	console.log(nomeCurso);
	console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');

	model.PesquisarCurso(nomeCurso).then(data => {
		console.log('!!!!!!!!!!!!!!!!!!! procurar curso !!!!!!!!!!!!!!!!!!!!!!');
		console.log(data);
		console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		res.json(data);
	});
});


router.post('/', function(req, res, next) {
	res.json(0);
});

router.post('/recuperar/senha', function(req, res, next) {
	var post = req.body;
	console.log('00000000000000 É isso que recebo do recuperar senha 000000000000000');
	console.log(post);
	console.log('0000000000000000000000000000000000000000000000000000000000000000000');
	model.PesquisarEmail(post.email).then(idEmail => {
		console.log('----------------- ID Email ------------------------');
		console.log(idEmail);
		console.log('-----------------------------------------------------');
		if(idEmail != ''){
			var nova_senha = Math.random().toString(36).substring(7);
			var html = "<p>Sua nova senha é: <b>"+nova_senha+"</b>";
			var text = "Sua nova senha é: "+nova_senha;
			console.log('+++++++++++++++++++++++++ ESTOU RECUPERANDO A SENHA +++++++++++++++++++++++++++++++++');
			console.log(nova_senha);
			console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			control.SendMail(post.email, 'Recuperação de Senha - MurOn', html, text);
			var data_insert = {id: idEmail, senha: nova_senha};
			console.log('DDDDDDDDDDDDDDDDDDDDDDDD DATA_INSERT DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
			console.log(data_insert);
			console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
			model.AlterarSenhaUsuarioPorId(data_insert).then(data_alterado_sucesso =>{
				console.log('data_alterado_sucesso');
				res.jsno(data_alterado_sucesso);
			});

		}else{
			console.log(';;;;;;;;;;;;;;;;;;;;;;; não tem email no muron!! ;;;;;;;;;;;;;;;;;;;;;');
			console.log(post.email);
			console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
			res.json(['email_nao_cadastrado']);
		}
	});

	
	// res.json(10);
});

router.post('/cadastrar/usuario', function(req, res, next) {
	var post = req.body;
	var post_limpo = model.VerificarSenha(post);
	console.log('88888888888888 POST LIMPO ALUNO 8888888888888888888888888888888');
	console.log(post_limpo);
	console.log('888888888888888888888888888888888888888888888888888888888888888');
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


router.post('/entrar_sistema', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);
	console.log('QQQQQQQQQQQQQQQ ESTOU NO TESTE_ENTRAR SEM USAR O POST NORMAL DO LOGIN QQQQQQQQQQQQQQQQQQQQQQQ');
	console.log(POST);
	console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');
	
	model.Login(POST).then(data => {
		if(data.length > 0){
			model.VerificarValidado(data[0].id).then(dataVerificado =>{
				console.log('XXXXXXXXXXXXXXXXXXXX DATA VERIFICADO XXXXXXXXXXXXXXXXXXXX');
				console.log(dataVerificado);
				console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
				if(dataVerificado[0].validacao == 0){
					model.VerificarDeletado(data[0].id).then(dataDeletado => {
						console.log('YYYYYYYYYYYYYYYYYYYYYYY DATA DELETADO YYYYYYYYYYYYYYYYYYYYYY');
						console.log(dataDeletado);
						console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY');
						if(dataDeletado == ''){
							console.log('2ZZZZZZZZZZZZZZZZZL DATA LOGIN ZZZZZZZZZZZZZZZZZZZZZZZZZZ');
							console.log(data);
							console.log('2ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
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
	

	console.log('00000000000000000 POST LIMPO 00000000000000000000000000000');
	console.log(post_limpo);
	console.log('0000000000000000000000000000000000000000000000000000000000');

	if (Object.keys(post_limpo).length > 0) {
		/*Para identificar se o nome do murer for muron, se tiver muron no nome não cadastrar*/
		model.VerSeMuron(post_limpo.nome_murer).then(nome_murer_muron => {
			if(nome_murer_muron == ''){

				if(post_limpo.tipo == 2){
					if(post_limpo.id_faculdade == ''){
						model.CadastrarFaculdadeCasoNaoExistir(nome_facul).then(id_faculdade_criada =>{
							post_limpo.id_faculdade = id_faculdade_criada;
							model.CadastrarParceiro(post_limpo).then(id_parceiro => {
								res.json(id_parceiro);
							});						
						});

					}else{
						model.VerSeExisteParceiroFaculdade(post_limpo.id_faculdade).then(temParceiro=>{
							if(temParceiro == ''){
								model.CadastrarParceiro(post_limpo).then(id_parceiro => {
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
