'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class GruposModel {
	Inicio() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM grupos WHERE deletado = ?', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelectGrupo(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM grupos WHERE id_lider = ?', [id_usuario]).then(data => {
				resolve(data);
			});
		});
	}

	GetGrupo(id) {
		// Para retornar quando chamar a função
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, (SELECT b.nome FROM grupos as b WHERE b.id = a.id_usuario LIMIT 1) as nome_usuario FROM obras as a WHERE a.deletado = ? AND a.id = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}

	InsertGrupo(post) {
		return new Promise(function(resolve, reject) {
			helper.Insert('grupos', post).then(data => {
				resolve(data);
			});
		});
	}

	UpdateGrupo(post) {
		return new Promise(function(resolve, reject) {
			helper.Update('grupos', post).then(data => {
				resolve(data);
			});
		});
	}
	
	DesativarGrupo(post) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('grupos', post).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = GruposModel;