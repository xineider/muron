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


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);
	model.Login(POST).then(data => {
		if(data.length > 0){
			model.VerificarValidado(data[0].id).then(dataVerificado =>{
				console.log('VVVVVVVVVVVVVVVVVV DATA VERIFICADO VVVVVVVVVVVVVVVVVVVVVV');
				console.log(dataVerificado);
				console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
				if(dataVerificado[0].validacao == 0){
					model.VerificarDeletado(data[0].id).then(dataDeletado => {
						console.log('DDDDDDDDDDDDDDDDD DATA DELETADO DDDDDDDDDDDDDDDDDD');
						console.log(dataDeletado);
						console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
						if(dataDeletado == ''){
							console.log('LLLLLLLLLLLLLLLLLLLLLLLL DATA LOGIN LLLLLLLLLLLLLLLLLLLLLLLLLLL');
							console.log(data);
							console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
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
					res.render('login/index', { alertaAcesso: 'Agora é só aguardar dentro de 1 a 2 dias úteis o e-mail de confirmação de parceria com o Muron.', tipo_alerta: 'login', iconeAlerta:'fa-handshake-o', usuario: req.session.usuario });
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
