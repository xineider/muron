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
	GetRelacao(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, nome FROM faculdades_relacoes WHERE id_faculdade = ? AND deletado = ?', [id, 0]).then(data => {
				resolve(data);
			});
		});
	}
	GetFaculdadeVer(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT faculdade FROM usuarios WHERE id = ? AND deletado = ?', [id_usuario, 0]).then(data_user => {
				console.log('00000000 FACULDADE 0000000000000000');
				console.log(data_user);
				console.log('00000000000000000000000000000000000');

				console.log(data_user.faculdade);
				console.log(data_user.length);
				console.log(typeof data_user.faculdade == 'undefined');
				console.log(typeof data_user.faculdade != 'undefined');

				 if (data_user.length > 0 && typeof data_user.faculdade != 'undefined') {
					helper.Query('SELECT id_faculdade FROM faculdades_relacoes WHERE nome = ? AND deletado = ?', [data_user[0].faculdade, 0]).then(data_faculdade => {
						console.log('****************** DATA FACULDADE *********************************');
						console.log(data_faculdade);
						console.log('*******************************************************************');
						if(data_faculdade.length >0 && typeof data_faculdade.id_faculdade !='undefined'){
							helper.Query('SELECT a.*, (SELECT COUNT(b.id) FROM usuarios_contatos as b WHERE b.id_usuario2 = a.id AND b.id_usuario = ? AND b.deletado = ? LIMIT 1) as amigos,\
							DATE_FORMAT(a.nascimento, "%d/%m/%Y") as nascimento\
							FROM usuarios as a WHERE a.deletado = ? AND a.id = ?', [id_usuario, 0, 0, data_faculdade[0].id_faculdade]).then(data => {
								console.log('+++++++++++++++++ DADOS AMIGOS +++++++++++++++++++++++++++');
								console.log(data);
								console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
								resolve(data);
							});
						}else{
							resolve(1);
						}						
					});
				} else {
					console.log('---------------- Não existe a faculdade ------------------');
					console.log(data_user.length);
					console.log('----------------------------------------------------------');
					resolve(2);
				}
			});
		});
	}
	GetPostagemByFaculdade(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, id_usuario,\
						(SELECT b.nome_murer FROM usuarios as b WHERE b.deletado = ? AND b.id = postagens.id_usuario) as usuario,\
						imagem, descricao, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
						FROM postagens WHERE deletado = ? AND id_usuario = ?', [0, 0, id]).then(data => {
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
	InsertRelacao(post) {
		return new Promise(function(resolve, reject) {
			helper.Insert('faculdades_relacoes', post).then(data => {
				resolve(data);
			});
		});
	}
	DesativarRelacao(post) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('faculdades_relacoes', post).then(data => {
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