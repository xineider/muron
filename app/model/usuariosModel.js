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
				console.log(data);
				resolve(data);
			});
		});
	}
	GetUsuario(id) {
		// Para retornar quando chamar a função
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, (SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario LIMIT 1) as nome_usuario FROM obras as a WHERE a.deletado = ? AND a.id = ?', [0, id]).then(data => {
				resolve(data);
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