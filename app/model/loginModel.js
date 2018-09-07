'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class IndexModel {
	Login(POST) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT id, tipo, nome_murer, email,id_faculdade FROM usuarios WHERE nome_murer = ? AND senha = ?', [POST.nome_murer, POST.senha]).then(data => {
		  		if (typeof data != 'undefined' && data.length > 0) {
			        var hash_login = helper.Encrypt(Date());
			        data[0].hash_login = hash_login;
			        helper.Update('usuarios', {id: data[0].id, hash_login: hash_login}).then(data_up => {
		          		resolve(data);
			        });
		      	} else {
			      	resolve(data);
		      	}
			});
		});
	}
	LoadConfig(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM configuracoes WHERE id_usuario = ?', [id]).then(data => {
				resolve(data);
			});
		});
	}
	VerificarValidado(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id,validacao FROM usuarios WHERE id = ?', [id]).then(data => {
				resolve(data);
			});
		});
	}
	VerificarDeletado(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM usuarios WHERE id = ? AND deletado = ?', [id,1]).then(data => {
				resolve(data);
			});
		});
	}


}
module.exports = IndexModel;
