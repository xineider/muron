'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class FaculdadesModel {
	Inicio() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM faculdades WHERE deletado = ?', [0]).then(data => {
				resolve(data);
			});
		});
	}
	SelectFaculdade() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM faculdades', []).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
	GetFaculdade(id) {
		// Para retornar quando chamar a função
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, (SELECT b.nome FROM faculdades as b WHERE b.id = a.id_usuario LIMIT 1) as nome_usuario FROM obras as a WHERE a.deletado = ? AND a.id = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	InsertFaculdade(post) {
		return new Promise(function(resolve, reject) {
			helper.Insert('faculdades', post).then(data => {
				resolve(data);
			});
		});
	}
	UpdateFaculdade(post) {
		return new Promise(function(resolve, reject) {
			helper.Update('faculdades', post).then(data => {
				resolve(data);
			});
		});
	}
	DesativarFaculdade(post) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('faculdades', post).then(data => {
				resolve(data);
			});
		});
	}


	// SelectFaculdade(nome) {
	// 	return new Promise(function(resolve, reject) {
	// 		helper.Query('SELECT * FROM faculdades WHERE faculdades = ?', [nome]).then(data => {
	// 			console.log(data);
	// 			resolve(data);
	// 		});
	// 	});
	// }
}
module.exports = FaculdadesModel;