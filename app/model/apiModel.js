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
				if (result.length <= 0) {
					if(data.tipo ==2 ){
						data.faculdade = data.nome;
					}
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

	InsertFaculdadeRelacao(POST) {
		delete POST.tipo;
		delete POST.nome_murer;
		delete POST.email;
		delete POST.celular;
		delete POST.nome_contato;
		delete POST.descricao;
		delete POST.senha;
		delete POST.faculdade;

		return new Promise(function(resolve, reject) {
			helper.Insert('faculdades_relacoes', POST).then(data => {
				resolve(data);
			});
		});
	}




}
module.exports = ApiModel;