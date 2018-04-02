'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class IndexModel {
	Login(POST) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT id, tipo, nome_murer, email FROM usuarios WHERE login = ? AND senha = ? AND deletado = ?', [POST.login, POST.senha, 0]).then(data => {
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
}
module.exports = IndexModel;