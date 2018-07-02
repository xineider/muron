
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var apiModel = require('../model/apiModel.js');
var model = new apiModel;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
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
	if (Object.keys(post_limpo).length > 0) {
		model.CadastrarUsuario(post_limpo).then(data => {
			res.json(data);
		});
	} else {
		res.json([]);
	}
});
router.post('/cadastrar/parceiro', function(req, res, next) {
	var post = req.body;
	var post_limpo = model.VerificarSenha(post);

	if (Object.keys(post_limpo).length > 0) {
		model.CadastrarParceiro(post_limpo).then(id_parceiro => {
			console.log('00000000000000000 POST LIMPO 00000000000000000000000000000');
			console.log(post_limpo);
			console.log('0000000000000000000000000000000000000000000000000000000000');

			if(post_limpo.tipo == 2){
				post_limpo.id_faculdade = id_parceiro; 
				model.InsertFaculdadeRelacao(post_limpo).then(id_faculdade =>{								
				});
			};

			res.json(id_parceiro);	
		});
	} else {
		res.json([]);
	}
});
module.exports = router;
