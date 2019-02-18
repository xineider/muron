 'use strict';
 var express = require('express');
 var app = express();
 var Helper = require('./model.js');
 var helper = new Helper;

 class ApiModel {

 	CadastrarUsuario(data) {
 		return new Promise(function(resolve, reject) {
 			helper.Query('SELECT id FROM usuarios WHERE nome_murer = ?', [data.nome_murer]).then(result => {
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
 						var dataFaculdade = {id:data.id_faculdade,nome_contato:data.nome_contato, descricao:data.descricao};
 						helper.Update('faculdades_inep', dataFaculdade).then(id_faculdade => {
 							helper.Insert('usuarios', data).then(data => {
 								resolve(data);
 							});
 						});
 					}else{
 						data.id_faculdade = 0;
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


 	CadastrarFaculdadeCasoNaoExistir(nome_faculdade){
 		return new Promise(function(resolve, reject) {

 			helper.Query('SELECT id FROM faculdades_inep WHERE NO_IES = ? LIMIT 1', [nome_faculdade]).then(dataFaculdade => {

 				if(dataFaculdade == ''){
 					var post_insert = {NO_IES:nome_faculdade,SGL_IES:'',ativacao:1,recorrencia:1};
 					helper.Insert('faculdades_inep', post_insert).then(data => {
 						resolve(data);
 					});
 				}else{
 					resolve(dataFaculdade[0].id)
 				}
 			});
 		});
 	}


 	CadastrarCursoCasoNaoExistir(nome_curso){
 		return new Promise(function(resolve, reject) {


 			helper.Query('SELECT id FROM cursos WHERE NO_CURSO = ? LIMIT 1', [nome_curso]).then(dataCurso => {
 				if(dataCurso == ''){
 					var post_insert = {NO_CURSO:nome_curso,ativacao:1};

 					helper.Insert('cursos', post_insert).then(data => {
 						resolve(data);
 					});
 				}else{
 					resolve(dataCurso[0].id);
 				}
 			});

 		});
 	}

 	FaculdadeRecorrenciaAluno(id_faculdade){
 		return new Promise(function(resolve, reject) {
 			helper.Query('SELECT * FROM faculdades_inep WHERE id = ?', [id_faculdade]).then(result => {
 				//se a ativacao for por aluno eu adiciono 1 na recorrencia
 				if(result[0].ativacao == 1){
 					var recorrencia_new = result[0].recorrencia + 1;
 					var data_update = {id:result[0].id,recorrencia:recorrencia_new};
 					helper.Update('faculdades_inep', data_update).then(id_faculdade_upd => {
 						resolve(id_faculdade_upd);
 					});
 				}else{
 					resolve([]);
 				}
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

 	CadastrarRelacaoAlunoFaculdade(POST){
 		return new Promise(function(resolve, reject) {
 			helper.Insert('faculdades_relacoes_aluno', POST).then(data => {
 				resolve(data);
 			});
 		});
 	}




 	SelecionarFaculdades(){
 		return new Promise(function(resolve, reject) {
 			helper.Query('SELECT nome,id FROM faculdades WHERE deletado = ? ORDER BY nome ', [0]).then(data => {
 				resolve(data);
 			});
 		});
 	}





 	PesquisarFaculdade(nomeFaculdade) {
 		return new Promise(function(resolve, reject) {
 			/*Seleciono a pesquisa de acordo com o que foi digitado e coloco entre parênteses() a sigla se tiver alguma*/
 			helper.Query('SELECT id,\
 				(CASE WHEN SGL_IES = "" THEN NO_IES ELSE\
 				(CASE WHEN SGL_IES != "" THEN CONCAT(NO_IES," (",SGL_IES,")")\
 				END)END) as name\
 				FROM faculdades_inep WHERE NO_IES LIKE CONCAT("%", ?, "%") OR SGL_IES LIKE CONCAT("%", ?, "%") ORDER BY NO_IES ASC LIMIT 5',[nomeFaculdade,nomeFaculdade]).then(data => {
 					resolve(data);
 				});
 			});
 	}



 	PesquisarCurso(nomeCurso) {
 		return new Promise(function(resolve, reject) {
			/*Seleciono a pesquisa de acordo com o que foi digitado e coloco entre parênteses() a sigla se tiver alguma*/
 			helper.Query('SELECT id, NO_CURSO as name  \
 				FROM cursos WHERE NO_CURSO LIKE CONCAT("%", ?, "%") ORDER BY NO_CURSO ASC LIMIT 5',[nomeCurso]).then(data => {
 					resolve(data);
 				});
 			});
 	}



 	PesquisarEmail(email) {
 		return new Promise(function(resolve, reject) {
 			/*seleciono o id para ver se existe algum usuario com aquele email*/
 			helper.Query('SELECT id	FROM usuarios WHERE email = ? AND deletado = ? LIMIT 1',[email,0]).then(data => {
 				resolve(data);
 			});
 		});
 	}


 	AlterarSenhaUsuarioPorId(POST){
 		return new Promise(function(resolve, reject) {
 			POST.senha = helper.Encrypt(POST.senha);
 			helper.Update('usuarios', POST).then(data => {
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


 	Login(POST) {
 		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT id, tipo, nome_murer, email,id_faculdade FROM usuarios WHERE nome_murer = ? AND senha = ?', [POST.nome_murer, POST.senha]).then(data => {
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

 	VerificarValidado(id){
 		return new Promise(function(resolve, reject) {
 			helper.Query('SELECT id,validacao FROM usuarios WHERE id = ?', [id]).then(data => {
 				resolve(data);
 			});
 		});
 	}

 	VerificarDeletado(id){
 		return new Promise(function(resolve, reject) {
 			helper.Query('SELECT id FROM usuarios WHERE id = ? AND deletado = ?', [id,1]).then(data => {
 				resolve(data);
 			});
 		});
 	}

 }
 module.exports = ApiModel;