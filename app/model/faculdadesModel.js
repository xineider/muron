'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class FaculdadesModel {
	Inicio() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM faculdades_inep WHERE deletado = ?', [0]).then(data => {
				resolve(data);
			});
		});
	}
	GetRelacao(id_faculdade,tipo) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id, b.nome \
				FROM faculdades_relacoes_aluno as a \
				LEFT JOIN usuarios as b ON a.id_aluno = b.id\
				WHERE a.deletado = ? AND b.id_faculdade = ? AND b.tipo != ? \
				GROUP BY b.id ORDER BY b.nome DESC', [0,id_faculdade,tipo]).then(data => {
					resolve(data);
				});
			});
	}
	GetFaculdadeVer(id_usuario,id_faculdade) {
		return new Promise(function(resolve, reject) {
			//Seleciona o nome da Faculdade do Usuario
			if(id_usuario != 1){
				helper.Query('SELECT nome FROM faculdades_inep WHERE id = ? AND deletado = ?', [id_faculdade, 0]).then(data_user => {
					console.log('************* Existe Faculdade ********************');
					console.log(data_user);
					console.log('***************************************************');
				 	//Se existe o nome da Faculdade selecionar o id da faculdade da tabela faculdade_relacoes de acordo com o nome da faculdade
				 	if (data_user.length > 0 && typeof data_user.nome != null) {
				 		resolve(data_user);
				 	}else{
				 		console.log('---------------- Não existe a faculdade ------------------');
				 		console.log(data_user.length);
				 		console.log('----------------------------------------------------------');
				 		resolve(2);
				 	}
				 });
			};
		});
	}

	// 	GetFaculdadeVer(id_usuario,id_faculdade) {
	// 	return new Promise(function(resolve, reject) {
	// 		//Seleciona o nome da Faculdade do Usuario
	// 		if(id_usuario != 1){
	// 			helper.Query('SELECT nome FROM faculdades WHERE id = ? AND deletado = ?', [id_faculdade, 0]).then(data_user => {
	// 				console.log('************* Existe Faculdade ********************');
	// 				console.log(data_user);
	// 				console.log('***************************************************');
	// 				if (data_user.length > 0 && typeof data_user.nome != null) {
	// 			 	//Se existe o nome da Faculdade selecionar o id da faculdade da tabela faculdade_relacoes de acordo com o nome da faculdade

	// 				//Seleciona os dados dos usuarios e conta os amigos
	// 				helper.Query('SELECT a.*,\
	// 					(SELECT COUNT(b.id) FROM usuarios_contatos as b WHERE b.id_usuario2 = a.id AND b.id_usuario = ? AND b.deletado = ? LIMIT 1) as amigos,\
	// 					DATE_FORMAT(a.nascimento, "%d/%m/%Y") as nascimento\
	// 					FROM usuarios as a WHERE a.deletado = ? AND a.id = ?', [id_usuario, 0, 0, id_faculdade]).then(data => {
	// 						console.log('..................................... DADOS AMIGOS .....................................');
	// 						console.log(data);
	// 						console.log('........................................................................................');
	// 						if(data.length > 0){
	// 							resolve(data);
	// 						}else{
	// 							resolve(1);
	// 						}
	// 					});
	// 				}else{
	// 					console.log('---------------- Não existe a faculdade ------------------');
	// 					console.log(data_user.length);
	// 					console.log('----------------------------------------------------------');
	// 					resolve(2);
	// 				}
	// 			});
	// 		};
	// 	});
	// }




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
			helper.Query('SELECT *, (SELECT b.nome FROM faculdades_inep as b WHERE b.id = a.id_usuario LIMIT 1) as nome_usuario FROM obras as a WHERE a.deletado = ? AND a.id = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}

	GetUsuarioMurer(POST) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM usuarios WHERE nome_murer like CONCAT("%", ?, "%") AND deletado = ?', [POST, 0]).then(data => {
				resolve(data);
			});
		});
	}

	GetAlunoNaRelacao(post){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id_aluno FROM faculdades_relacoes_aluno WHERE deletado = ? AND id_faculdade = ? AND id_aluno = ?', [0,post.id_faculdade,post.id_aluno]).then(data => {
				resolve(data);
			});
		});
	}


	InsertRelacao(post) {
		return new Promise(function(resolve, reject) {
			helper.Insert('faculdades_relacoes_aluno', post).then(data => {
				resolve(data);
			});
		});
	}
	DesativarRelacao(post) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('faculdades_relacoes_aluno', post).then(data => {
				resolve(data);
			});
		});
	}
	InsertFaculdade(post) {
		return new Promise(function(resolve, reject) {
			helper.Insert('faculdades_inep', post).then(data => {
				resolve(data);
			});
		});
	}
	UpdateFaculdade(post) {
		return new Promise(function(resolve, reject) {
			helper.Update('faculdades_inep', post).then(data => {
				resolve(data);
			});
		});
	}
	DesativarFaculdade(post) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('faculdades_inep', post).then(data => {
				resolve(data);
			});
		});
	}
	
}
module.exports = FaculdadesModel;