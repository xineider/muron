'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class ChatsModel {
	GetContatos(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT (SELECT b.nome_murer FROM usuarios as b WHERE b.id = a.id_usuario2) as nome_murer,\
						(SELECT c.email FROM usuarios as c WHERE c.id = a.id_usuario2) as email,\
						(SELECT d.nome FROM usuarios as d WHERE d.id = a.id_usuario2) as nome,\
						a.id_usuario2, a.id\
						FROM usuarios_contatos as a WHERE a.deletado = ? AND a.id_usuario = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	GetMensagens(id, id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM chats_mensagens WHERE\
						(id_usuario = ? AND id_usuario_para = ?)\
						OR (id_usuario = ? AND id_usuario_para = ?) ORDER BY id DESC', [id, id_usuario, id_usuario, id]).then(data => {
				resolve(data);
			});
		});
	}
	SelecioneMensagens(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM chats_mensagens WHERE id_chat = ?', [id]).then(data => {
				resolve(data);
			});
		});
	}
	InsertMensagem(post) {
		return new Promise(function(resolve, reject) {
			helper.Insert('chats_mensagens', post).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = ChatsModel;