'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class ChatsModel {
	SelecioneChats(id_usuario) {
		var data = {};
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT b.* FROM chats_participantes as a INNER JOIN chats as b ON a.id_chat = b.id WHERE deletado = ? AND id_usuario = ?', [0, id_usuario]).then(data_participantes => {
				data['grupos'] = data_participantes;
				helper.Query('SELECT * FROM usuarios WHERE deletado = ?', [0]).then(data_usuarios => {
					data['usuarios'] = data_usuarios;
					resolve(data);
				});
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
	EnviarMensagen(id, id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM chats_mensagens WHERE id_chat = ?', [id]).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = ChatsModel;