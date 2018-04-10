'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class IndexModel {
	Login(POST) {
		POST.senha = helper.Encrypt(POST.senha);
		// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
		query = 'SELECT id FROM usuarios WHERE login = ? AND senha = ?';
		array = [POST.login, POST.senha];
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			hlper.Query(query, array).then(data => {
				resolve(data);
			});
		});
	}
	SelectUsuarios() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios', []).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
	GetCategorias() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, nome FROM postagens_categorias WHERE deletado = ? ORDER BY nome DESC', [0]).then(data => {
				resolve(data);
			});
		});	
	}
	GetPosts(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id,\
						(SELECT nome FROM usuarios WHERE id = ? AND deletado = ?) as usuario,\
						imagem, descricao, contato, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
						FROM postagens WHERE deletado = ? AND id_categoria = ?', [id, 0, 0, id]).then(data => {
				resolve(data);
			});
		});	
	}
	GetPostagens(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, id_usuario,\
						(SELECT b.nome_murer FROM usuarios as b WHERE b.deletado = ? AND b.id = postagens.id_usuario) as usuario,\
						(SELECT c.id FROM postagens_gostei as c WHERE c.id_usuario = ? AND c.id_postagem = postagens.id AND c.deletado = ?) as gostei,\
						imagem, descricao, contato, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
						FROM postagens WHERE deletado = ? AND id_usuario = ?', [0, id, 0, 0, id]).then(data => {
				resolve(data);
			});
		});	
	}
	Inicio() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios', []).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
}
module.exports = IndexModel;