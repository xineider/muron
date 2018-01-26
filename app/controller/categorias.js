// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var CategoriasModel = require('../model/categoriasModel.js');
var model = new CategoriasModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

router.get('/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'categorias/categorias', data: data});
});
router.get('/postagens/criar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'categorias/postagens_criar', data: data});
});


module.exports = router;