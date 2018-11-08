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

	GetUsuariosFaculdade(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,\
				(SELECT NO_IES FROM faculdades_inep as c WHERE id IN  (SELECT id_faculdade FROM faculdades_relacoes_aluno as d WHERE d.id_aluno = a.id and deletado = ?)) as faculdade \
				FROM usuarios as a WHERE a.deletado = ? AND a.tipo = ? ORDER BY a.data_cadastro', [0, 0, 1]).then(data => {
					console.log('DDDDDDDDDDDDDDDDDDDDDDD DADOS DOS USUARIOS DDDDDDDDDDDDDDDDDD');
					console.log(data);
					console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
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
				console.log('--------------- SELECIONANDO CURSO -----------------');
				console.log(dataCurso);
				console.log('----------------------------------------------------');

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



	
}
module.exports = PostagensModel;