
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

router.get('/filtro/pesquisar/faculdade/:nomeFaculdade', function(req, res, next) {

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

	if (Object.keys(post_limpo).length > 0) {
		model.CadastrarUsuario(post_limpo).then(id_usuario => {
			console.log('ESTOU AQUI');
			console.log(id_usuario);
			console.log(id_usuario>0);
			console.log(id_usuario[0]);
			console.log(typeof id_usuario);
			console.log('ola marilene');
			console.log(id_usuario == '');

			if(id_usuario != ''){
				data_insert = {id_faculdade: post_limpo.id_faculdade, id_aluno: id_usuario};
				console.log('7777777777777777777777777777 DATA INSERT 777777777777777777777777');
				console.log(data_insert);
				console.log('77777777777777777777777777777777777777777777777777777777777777777');
				model.CadastrarRelacaoAlunoFaculdade(data_insert).then(data =>{
					res.json(data);
				});
			}else{
				res.json([]);
			}


			
		});
	} else {
		res.json([]);
	}
});
router.post('/cadastrar/parceiro', function(req, res, next) {
	var post = req.body;
	var post_limpo = model.VerificarSenha(post);

	console.log('00000000000000000 POST LIMPO 00000000000000000000000000000');
	console.log(post_limpo);
	console.log('0000000000000000000000000000000000000000000000000000000000');

	if (Object.keys(post_limpo).length > 0) {
		console.log('§§§§§§§§§§§§§ post_limpo > 0 §§§§§§§§§§§§§§§§§§§§§§§§§');
		model.CadastrarParceiro(post_limpo).then(id_parceiro => {
	

			// if(post_limpo.tipo == 2){
			// 	post_limpo.id_faculdade = id_parceiro; 
			// 	model.InsertFaculdadeRelacao(post_limpo).then(id_faculdade =>{								
			// 	});
			// };

			res.json(id_parceiro);	
		});
	} else {
		res.json([]);
	}
});
module.exports = router;
