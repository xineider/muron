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
	model.GetPostagemByCat(id, req.session.usuario.id).then(data_postagens => {
		data.postagens = data_postagens;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens', data: data, usuario: req.session.usuario});
	});
});
router.get('/pesquisar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens_pesquisar', data: data, usuario: req.session.usuario});
});
router.get('/comentarios/:id', function(req, res, next) {
	id = req.params.id;
	model.GetComentarios(id).then(data_comentarios => {
		data.comentarios = data_comentarios;
		data.postagem = id;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens_comentarios', data: data, usuario: req.session.usuario});
	});
});
router.get('/criar', function(req, res, next) {
	model.GetCategorias().then(data=> {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens_criar', data: data, usuario: req.session.usuario});
	});
});

// POST
router.post('/uploadarquivo', function(req, res, next) {
  var sampleFile = req.files.arquivo;
  var nome = control.DateTimeForFile()+'_'+sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./assets/uploads/'+nome, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

		res.json(nome);
  });
});
router.post('/pesquisar', function(req, res, next) {
	POST = req.body;
	model.SearchPostagem(POST, req.session.usuario.id).then(data_postagens => {
		data.postagens = data_postagens;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens', data: data, usuario: req.session.usuario});
	});
});
router.post('/gostei', function(req, res, next) {
	POST = req.body;
	model.AddLike(POST).then(data=> {
		res.json(data);
	});
});
router.post('/cadastrar', function(req, res, next) {
	POST = req.body;
	POST.id_usuario = req.session.usuario.id;
	console.log(POST);
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
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'postagens/postagens_criar', data: data, usuario: req.session.usuario});
	});
});
router.post('/desativar/comentario', function(req, res, next) {
	POST = req.body;
	model.DesativeComentario(POST).then(data => {
		res.json(data);
	});
});


module.exports = router;