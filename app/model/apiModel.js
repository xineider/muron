'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class ApiModel {
	CadastrarUsuario(data) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM usuarios WHERE nome_murer = ?', [data.nome_murer]).then(result => {
				console.log(result);
				if (result.length <= 0) {
					helper.Insert('usuarios', data).then(data => {
						resolve(data);
					});
				} else {
					resolve([]);
				}
			});
		});
	}
	CadastrarParceiro(data) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM usuarios WHERE nome_murer = ?', [data.nome_murer]).then(result => {
				console.log(result);
				if (result.length <= 0) {
					helper.Insert('usuarios', data).then(data => {
						resolve(data);
					});
				} else {
					resolve([]);
				}
			});
		});
	}
	VerificarSenha(data) {
		if (typeof data.senha != 'undefined') {
			if (data.senha == data.senha_confirmar) {
				delete data.senha_confirmar;
				var senha = helper.Encrypt(data.senha);
				data.senha = senha;
				return data;
			} else {
				return [];
			}
		} else {
			return [];
		}
	}
}
module.exports = ApiModel;