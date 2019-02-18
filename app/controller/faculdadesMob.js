// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var FaculdadesModel = require('../model/faculdadesModel.js');
var model = new FaculdadesModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelectFaculdade().then(data=> {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'faculdades/faculdadesMob', data: data, usuario: req.session.usuario});
	});
});

router.get('/ver/:id', function(req, res, next) {
	id = req.params.id;
	/*id da categoria que sempre é 3*/

	if(req.session.usuario.id != 1){}

	model.GetFaculdadeVer(req.session.usuario.id,req.session.usuario.id_faculdade).then(data_faculdade => {

		// if(data_faculdade != false)
		if (data_faculdade != 2) {
			// data.perfil = data_faculdade;
			model.GetPostagemByFaculdade(data.perfil[0].id).then(data_postagens => {
				data.postagens = data_postagens;
				res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/usuarios_verMob', data: data, usuario: req.session.usuario});
			});
		} else if(data_faculdade == 2){
				// res.redirect('/sistema/');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'usuarios/usuarios_verMob', data: data, usuario: req.session.usuario,error:data_faculdade});
			}
		});
});
router.get('/alunos/relacao', function(req, res, next) {
	model.GetRelacao(req.session.usuario.id_faculdade,req.session.usuario.tipo).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'faculdades/faculdades_relacaoMob', data: data, usuario: req.session.usuario});
	});
});

// Metodos POST
router.post('/alunos/relacao/cadastrar', function(req, res, next) {
	POST = req.body;
	model.GetUsuarioMurer(POST.nome).then(usuario_id => {
		if (usuario_id.length > 0) {
			/*usuario existe*/
			data_insert = {id_faculdade: req.session.usuario.id_faculdade, id_aluno:  usuario_id[0].id,};
			model.GetAlunoNaRelacao(data_insert).then(usuarionarelacao =>{
				/*se o aluno já esta na relação da faculdade*/
				if(usuarionarelacao == 0 || usuarionarelacao == ''){
					model.InsertRelacao(data_insert).then(data=> {
						res.json(data);
					});
				}else{
					res.json([]);
				}
			})
		}else{
			res.json([]);
		}	
	});
});

router.post('/alunos/relacao/desativar', function(req, res, next) {
	POST = req.body;
	model.DesativarRelacao(POST).then(data=> {
		res.json(data);
	});
});

module.exports = router;
