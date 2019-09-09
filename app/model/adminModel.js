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
					resolve(data);
				});
			});	
	}

	// GetFaculdadesPorAtivacao(){
	// 	return new Promise(function(resolve, reject) {
	// 		helper.Query('SELECT a.* FROM faculdades_inep as a WHERE a.deletado = ? ORDER BY a.ativacao ASC', [0]).then(data => {
	// 			resolve(data);
	// 		});
	// 	});	
	// }

	GetFaculdadesCadastradas(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.* FROM faculdades_inep as a WHERE a.deletado = ? AND a.ativacao != ? ORDER BY a.ativacao ASC', [0,0]).then(data => {
				resolve(data);
			});
		});	
	}

	GetFaculdadesInep(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.* FROM faculdades_inep as a WHERE a.deletado = ? AND a.ativacao = ? ORDER BY a.ativacao ASC', [0,0]).then(data => {
				resolve(data);
			});
		});	
	}

	GetCursosPorAtivacao(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.* FROM cursos as a WHERE a.deletado = ? ORDER BY a.ativacao ASC', [0]).then(data => {
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
			helper.Update('usuarios', POST).then(data => {
				resolve(data);
			});
		});
	}

	AlterarSenhaUsuario(POST){
		return new Promise(function(resolve, reject) {
			POST.senha = helper.Encrypt(POST.senha);
			helper.Update('usuarios', POST).then(data => {
				resolve(data);
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

	GetFaculdadePorId(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM faculdades_inep WHERE id = ? and deletado = ?', [id,0]).then(data => {
				resolve(data);
			});
		});
	}

	GetCursoPorId(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM cursos WHERE id = ? and deletado = ?', [id,0]).then(data => {
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

	CadastrarFaculdade(POST){
		return new Promise(function(resolve, reject) {
			helper.Insert('faculdades_inep', POST).then(data => {
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


	DesativarCurso(post) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('cursos', post).then(data => {
				resolve(data);
			});
		});
	}


	AtualizarFaculdade(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('faculdades_inep', POST).then(data => {
				resolve(data);
			});
		});
	}

	AtualizarCurso(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('cursos', POST).then(data => {
				resolve(data);
			});
		});
	}


	
}
module.exports = PostagensModel;