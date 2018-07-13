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
 					if(data.tipo == 2 ){
 						var dataFaculdade = {nome:data.nome,nome_contato:data.nome_contato, descricao:data.descricao};
 						console.log('*************** DATA INSERÇÃO FACULDADE ********************');
 						console.log(dataFaculdade);
 						console.log('************************************************************');
 						helper.Insert('faculdades', dataFaculdade).then(id_faculdade => {
 							data.id_faculdade = id_faculdade;
 							console.log('))))))))))))) DADOS PARA INSERIR NA TABELA FACULDADES )))))))))))))))))))))))))))');
 							console.log(data);
 							console.log(')))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))');

	 						helper.Insert('usuarios', data).then(data => {
	 							resolve(data);
	 						});
 						});
 					}else{
 						data.id_faculdade = 0;
 						console.log('_____________________ DADOS DIVULGADOR ______________________');
 						console.log(data);
 						console.log('_____________________________________________________________');

 						helper.Insert('usuarios', data).then(data => {
	 							resolve(data);
	 						});
 					}
 					

 					

 				} else {
 					resolve([]);
 				}
 			});
 		});
 	}

 	SelecionarFaculdades(){
 		return new Promise(function(resolve, reject) {
 			helper.Query('SELECT nome FROM faculdades WHERE deletado = ? ORDER BY nome ', [0]).then(data => {
 				console.log('*********************** Faculdades do MODEL ***********************');
 				console.log(data);
 				console.log('*******************************************************************');
 				resolve(data);
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

 	InserFaculdade(POST){
		return new Promise(function(resolve, reject) {
			console.log('77777777777777777 Inserindo na Faculdade 7777777777777777777');
			console.log(POST);
			console.log('777777777777777777777777777777777777777777777777777777777777');

			delete POST.tipo;
			delete POST.nome_murer
			delete POST.email;
			delete POST.celular;
			delete POST.senha;


 			helper.Insert('faculdades', POST).then(data => {
 				resolve(data);
 			});
 		});

 	}

 	InsertFaculdadeRelacao(POST) {
 		delete POST.tipo;
 		delete POST.nome_murer;
 		delete POST.email;
 		delete POST.celular;
 		delete POST.nome_contato;
 		delete POST.descricao;
 		delete POST.senha;


 		return new Promise(function(resolve, reject) {
 			helper.Insert('faculdades_relacoes', POST).then(data => {
 				resolve(data);
 			});
 		});
 	}




 }
 module.exports = ApiModel;