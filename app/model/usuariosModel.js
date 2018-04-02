'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

// FAZER LEITURA DAS CONFIGURAÇÕES
var config = helper.Config();

// CONEXÃO MYSQL
var mysql      = require('mysql');
var connection = mysql.createConnection(config['mysql']);
connection.connect();
var query = '';
var array = [];

class UsuariosModel {
	Inicio() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ?', [0]).then(data => {
				resolve(data);
			});
		});
	}
	SelectUsuario() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios', []).then(data => {
				resolve(data);
			});
		});
	}
	GetUsuario(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, DATE_FORMAT(nascimento, "%d/%m/%Y") as nascimento FROM usuarios WHERE deletado = ? AND id = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	GetUsuarios(data) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id as id_usuario2, nome_murer, email FROM usuarios WHERE deletado = ? AND (nome_murer like CONCAT("%", ?, "%") OR nome like CONCAT("%", ?, "%") OR email like CONCAT("%", ?, "%"))', [0, data.pesquisar, data.pesquisar, data.pesquisar]).then(data => {
				resolve(data);
			});
		});
	}
	GetUsuarioContatos(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT (SELECT b.nome_murer FROM usuarios as b WHERE b.id = a.id_usuario2) as nome_murer,\
						(SELECT c.email FROM usuarios as c WHERE c.id = a.id_usuario2) as email,\
						a.id_usuario2, a.id\
						FROM usuarios_contatos as a WHERE a.deletado = ? AND a.id_usuario = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	GetPostagemByUser(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, id_usuario,\
						(SELECT b.nome_murer FROM usuarios as b WHERE b.deletado = ? AND b.id = postagens.id_usuario) as usuario,\
						imagem, descricao, contato, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
						FROM postagens WHERE deletado = ? AND id_usuario = ?', [0, 0, id]).then(data => {
				resolve(data);
			});
		});	
	}
	InsertContato(post) {
		var post2 = {};
		post2.id_usuario = post.id_usuario2;
		post2.id_usuario2 = post.id_usuario;
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM usuarios_contatos WHERE id_usuario = ? AND id_usuario2 = ?', [post.id_usuario, post.id_usuario2]).then(result => {
				if (result.length <= 0) {
					console.log(post);
					console.log(post2);
					helper.Insert('usuarios_contatos', post).then(data => {
						helper.Insert('usuarios_contatos', post2).then(data => {
							resolve(data);
						});
					});
				} else {
					resolve([]);
				}
			});
		});	
	}
	InsertUsuario(post) {
		return new Promise(function(resolve, reject) {
			helper.Insert('usuarios', post).then(data => {
				resolve(data);
			});
		});
	}
	CadastrarUsuario(post) {
		return new Promise(function(resolve, reject) {
			helper.Insert('usuarios', post).then(data => {
				resolve(data);
			});
		});
	}
	UpdateUsuario(post) {
		return new Promise(function(resolve, reject) {
			helper.Update('usuarios', post).then(data => {
				resolve(data);
			});
		});
	}
	DesativarUsuario(post) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('usuarios', post).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = UsuariosModel;