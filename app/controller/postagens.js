// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var postagensModel = require('../model/postagensModel.js');
var model = new postagensModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

router.get('/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens', data: data, usuario: req.session.usuario});
});
router.get('/ver/:id', function(req, res, next) {
	id = req.params.id;
	title = '';
	if(id == 1) {
		title = 'Estágios';
	} else if(id == 2) {

		title = 'Projetos';
	} else if (id == 3) {
		title = 'Faculdade';

	} else {		
		title = 'Divulgação';
	}
	model.AddViewCat(id, req.session.usuario.id).then(ret => {
		model.GetUsuario(req.session.usuario.id).then(data_usuario => {
			data_insert = {id_faculdade:req.session.usuario.id_faculdade, id_usuario:req.session.usuario.id,id_categoria:id, status:data_usuario[0].status, tipo:data_usuario[0].tipo};
			model.GetPostagemByCat(data_insert).then(data_postagens => {
				data.postagens = data_postagens;
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens_ver', data: data, usuario: req.session.usuario, title: title});
			});
		});


	});
});
router.get('/pesquisar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'api', {html: 'postagens/postagens_pesquisar', data: data, usuario: req.session.usuario});
});
router.get('/comentarios/:id', function(req, res, next) {
	id = req.params.id;
	model.GetComentarios(id).then(data_comentarios => {
		data.comentarios = data_comentarios;
		data.postagem = id;
		res.render(req.isAjaxRequest() == true ? 'api' : 'api', {html: 'postagens/postagens_comentarios', data: data, usuario: req.session.usuario});
	});
});
router.get('/criar', function(req, res, next) {
	model.GetCategorias().then(data=> {
		res.render(req.isAjaxRequest() == true ? 'api' : 'api', {html: 'postagens/postagens_criar', data: data, usuario: req.session.usuario});
	});
});
router.get('/pesquisar/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;

	if (pesquisa.indexOf('_') !== -1) {
		pesquisa = pesquisa.split('_').join('/');
	}

	model.GetUsuario(req.session.usuario.id).then(data_usuario=>{
		model.SearchPostagem(pesquisa, req.session.usuario.id,req.session.usuario.id_faculdade,data_usuario[0].status).then(data_postagens => {
			data.postagens = data_postagens;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens_ver', data: data, usuario: req.session.usuario, title: 'Pesquisa por: ' + pesquisa});
		});
	});
});


router.get('/adicionar/filtro', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens_filtro', data: data, usuario: req.session.usuario});
});

router.get('/adicionar/filtro/faculdades', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens_filtro_faculdades', data: data, usuario: req.session.usuario});
});



// POST
router.post('/uploadarquivo', function(req, res, next) {
	var arquivo = req.files.arquivo;
	var nomeImagem = control.DateTimeForFile()+'_'+arquivo.name;

	console.log('@@@@@@@@@@@@@@@ arquivo @@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log(arquivo);
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

  // Use the mv() method to place the file somewhere on your server
  arquivo.mv('./assets/uploads/'+nomeImagem, function(err) {
  	if (err) {
  		return res.status(500).send(err);
  	}
  });
  var nomeImagemPerfil = '/assets/uploads/' + nomeImagem;

  data.imagem = nomeImagemPerfil;

  res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'postagens/imagem_cropper', data: data, usuario: req.session.usuario});

});


router.post('/tipo', function(req, res, next) {
	POST = req.body;
	model.SearchTipo(POST, req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens_tipos', data: data, usuario: req.session.usuario});
	});
});
router.post('/gostei', function(req, res, next) {
	POST = req.body;
	model.AddLike(POST).then(data=> {
		res.json(data);
	});
});

router.post('/editar_imagem_postagem/', function(req, res, next) {

	var arquivo = req.files.arquivo;
	var nome = control.DateTimeForFile()+'_'+arquivo.name+'_cropped.png';

	console.log('UUUUUUUUUUUUUUUUUUUUUU sampleFile UUUUUUUUUUUUUUUUUUUUUUUU');
	console.log(arquivo);
	console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');

	arquivo.mv('./assets/uploads/'+nome, function(err) {
		if (err) {
			return res.status(500).send(err);
		}
	});
	res.json(nome);
});


router.post('/cadastrar', function(req, res, next) {
	POST = req.body;
	POST.id_usuario = req.session.usuario.id;
	POST.id_faculdade = req.session.usuario.id_faculdade;
	POST.id_tipo = req.session.usuario.tipo;
	model.InsertPostagem(POST).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens_criar', data: data, usuario: req.session.usuario});
	});
});
router.post('/desativar/', function(req, res, next) {
	POST = req.body;
	model.DesativePostagem(POST).then(data => {
		res.json(data);
	});
});
router.post('/cadastrar/comentario', function(req, res, next) {
	POST = req.body;
	model.InsertComentario(POST).then(data => {
		res.json(data);
	});
});
router.post('/desativar/comentario', function(req, res, next) {
	POST = req.body;
	model.DesativeComentario(POST).then(data => {
		res.json(data);
	});
});


module.exports = router;