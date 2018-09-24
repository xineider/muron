'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class PostagensModel {

	GetUsuarios(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id,nome,nome_murer,tipo,nome_contato FROM usuarios WHERE deletado = ? AND validacao = ? ORDER BY tipo', [0,0]).then(data => {
				resolve(data);
			});
		});
	}

	GetParceirosNaoValidados(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT  id,nome,nome_murer,email,celular,site,nome_contato,tipo FROM usuarios WHERE deletado = ? AND validacao = ? AND (tipo = ? OR tipo = ?) ORDER BY data_cadastro', [0, 1, 2, 3]).then(data => {
				resolve(data);
			});
		});	
	}


	GetCategorias() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, nome FROM postagens_categorias WHERE deletado = ? AND id != ? ORDER BY nome DESC', [0, 3]).then(data => {
				resolve(data);
			});
		});	
	}
	AddViewCat(id_categoria, id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('UPDATE postagens_categorias_view SET qtd_acesso = (qtd_acesso + 1) WHERE id_usuario = ? AND id_categoria = ?', [id_usuario, id_categoria]).then(data => {
				console.log('°°°°°°°°°°°°°° Atualizando postagens_categorias_view °°°°°°°°°°°°°°°°°°°°°°°°');
				console.log(data);
				console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');

				resolve(data);
			});
		});
	}

	SelectUsuarios() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios', []).then(data => {
				resolve(data);
			});
		});
	}

	AprovarUsuario(POST) {
		return new Promise(function(resolve, reject) {
			console.log('------------ DADOS DO POST DE APROVAR USUARIO -----------');
			console.log(POST);
			console.log('---------------------------------------------------------');
			helper.Update('usuarios', POST).then(data => {
				resolve(data);
			});
		});
	}

	AlterarSenhaUsuario(POST){
		return new Promise(function(resolve, reject) {
			
			var senha = Math.random().toString(36).substr(2, 8);
			console.log(senha);

			POST.senha = helper.Encrypt(senha);

			console.log('------------ DADOS DO POST DE ALTERAR SENHA USUARIO -----------');
			console.log(POST);
			console.log('---------------------------------------------------------');
			


			helper.Update('usuarios', POST).then(data => {
				resolve(senha);
			});
		});
	}



	GetUsuarioById(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE id = ? and deletado = ?', [id,0]).then(data => {
				resolve(data);
			});
		});
	}



	InsertPostagem(data) {
		return new Promise(function(resolve, reject) {
			helper.Insert('postagens', data).then(data => {
				resolve(data);
			});
		});
	}
	InsertComentario(data) {
		return new Promise(function(resolve, reject) {
			helper.Insert('postagens_comentarios', data).then(data => {
				resolve(data);
			});
		});
	}
	DesativeComentario(data) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('postagens_comentarios', data).then(data => {
				resolve(data);
			});
		});
	}
	DesativePostagem(data) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('postagens', data).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = PostagensModel;