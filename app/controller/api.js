
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


router.post('/', function(req, res, next) {
	res.json(0);
});

router.post('/recuperar/senha', function(req, res, next) {
	var post = req.body;
	var html = "<p>Sua nova senha é: <b>"+nova_senha+"</b>";
	var text = "Sua nova senha é: "+nova_senha;
	control.SendMail(post.email, 'Recuperação de Senha - MurOn', html, text);
	res.json(10);
});

router.post('/cadastrar/usuario', function(req, res, next) {
	var post = req.body;
	var post_limpo = model.VerificarSenha(post);
	console.log('88888888888888 POST LIMPO ALUNO 8888888888888888888888888888888');
	console.log(post_limpo);
	console.log('888888888888888888888888888888888888888888888888888888888888888');
	var nome_facul = post_limpo.nome_faculdade;
	var data_insert;
	delete post_limpo.nome_faculdade;

	if (Object.keys(post_limpo).length > 0) {
		/*Para identificar se o nome do murer for muron, se tiver muron no nome não cadastrar*/
		model.VerSeMuron(post_limpo.nome_murer).then(nome_murer_muron => {
			if(nome_murer_muron == ''){
				if(post_limpo.id_faculdade == ''){
					model.CadastrarFaculdadeCasoNaoExistir(nome_facul).then(id_faculdade_criada =>{
						console.log('jjjjjjjjjjjjjjjjjjjjj id da faculdade criada jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
						console.log(id_faculdade_criada);
						console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
						post_limpo.id_faculdade = id_faculdade_criada;
						model.CadastrarUsuario(post_limpo).then(id_usuario => {

							console.log('AAAAAAAAAAAAAAAA ID DO ALUNO AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
							console.log(id_usuario);
							console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

							if(id_usuario != ''){
								data_insert = {id_faculdade: id_faculdade_criada,id_aluno:id_usuario};
								console.log('888888888888888888888888888 DATA INSERT 88888888888888888888888');
								console.log(data_insert);
								console.log('888888888888888888888888888888888888888888888888888888888888888');
								model.CadastrarRelacaoAlunoFaculdade(data_insert).then(data =>{
									res.json(data);
								});

							}else{
								res.json(['muron_existente']);
							}
						});					
					});
				}else{
					model.FaculdadeRecorrenciaAluno(post_limpo.id_faculdade).then(id_faculdade_recorrencia =>{
						console.log('RRRRRRRRRRRRRRR ID DA FACULDADE RECORRENCIA RRRRRRRRRRRRRRRRR');
						console.log(id_faculdade_recorrencia);
						console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');	
						model.CadastrarUsuario(post_limpo).then(id_usuario => {
							if(id_usuario != ''){
								data_insert = {id_faculdade: post_limpo.id_faculdade, id_aluno: id_usuario};
								console.log('7777777777777777777777777777 DATA INSERT 777777777777777777777777');
								console.log(data_insert);
								console.log('77777777777777777777777777777777777777777777777777777777777777777');
								model.CadastrarRelacaoAlunoFaculdade(data_insert).then(data =>{
									res.json(data);
								});
							}else{
								res.json(['muron_existente']);
							}
						});
					});

				}

				// model.CadastrarFaculdadeCasoNaoExistir(faculdade_sem_sigla[0]).then(id_faculdade => {

				// });


			}else{
				res.json(['possui_muron']);
			};			
		});
	} else {
		res.json(['dado_invalido']);
	}
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
