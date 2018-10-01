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
 				
 				console.log('^^^^^^^^^^^^^^^DADOS CADASTRAR PARCEIRO ^^^^^^^^^^^^^^^^^^');
 				console.log(data);
 				console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');

 				if (result.length <= 0) {
 					if(data.tipo == 2 ){
 						var dataFaculdade = {id:data.id_faculdade,nome_contato:data.nome_contato, descricao:data.descricao};
 						console.log('*************** DATA INSERÇÃO FACULDADE ********************');
 						console.log(dataFaculdade);
 						console.log('************************************************************');
 						helper.Update('faculdades_inep', dataFaculdade).then(id_faculdade => {
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
 			helper.Query('SELECT nome,id FROM faculdades WHERE deletado = ? ORDER BY nome ', [0]).then(data => {
 				console.log('*********************** Faculdades do MODEL ***********************');
 				console.log(data);
 				console.log('*******************************************************************');
 				resolve(data);
 			});
 		});
 	}

 	PesquisarFaculdade(nomeFaculdade) {
 		return new Promise(function(resolve, reject) {

 			console.log('000000000000000 NOME FACULDADE 00000000000000000000');
 			console.log(nomeFaculdade);
 			console.log('00000000000000000000000000000000000000000');			

 			/*Seleciono a pesquisa de acordo com o que foi digitado e coloco entre parênteses() a sigla se tiver alguma*/
 			helper.Query('SELECT id, \
 				(CASE WHEN SGL_IES = "" THEN NO_IES ELSE\
 				(CASE WHEN SGL_IES != "" THEN CONCAT(NO_IES," (",SGL_IES,")")\
 				END)END) as name\
 				FROM faculdades_inep WHERE NO_IES LIKE CONCAT("%", ?, "%") OR SGL_IES LIKE CONCAT("%", ?, "%") ORDER BY NO_IES ASC LIMIT 5',[nomeFaculdade,nomeFaculdade]).then(data => {
 					console.log('------------------- PESQUISA DE FACULDADES ---------------');
 					console.log(data);
 					console.log('----------------------------------------------------------');
 					resolve(data);
 				});
 			});
 	}

 	VerSeMuron(nome_murer){
 		return new Promise(function(resolve, reject) {
 			helper.Query('SELECT id FROM usuarios WHERE ? LIKE CONCAT("%muron%") LIMIT 1',[nome_murer]).then(data => {
 				resolve(data);
 			});
 		});
 	}

 	VerSeExisteParceiroFaculdade(id_faculdade){
 		return new Promise(function(resolve, reject) {
 			helper.Query('SELECT id FROM usuarios WHERE id_faculdade = ? AND tipo = ? AND deletado = ? LIMIT 1 ',[id_faculdade,2,0]).then(data => {
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

 	CadastrarRelacaoAlunoFaculdade(POST){
 		return new Promise(function(resolve, reject) {
 			helper.Insert('faculdades_relacoes_aluno', POST).then(data => {
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