'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class PostagensModel {
	Login(POST) {
		// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
		query = 'SELECT id FROM usuarios WHERE login = ? AND senha = ?';
		array = [POST.login, POST.senha];
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			hlper.Query(query, array).then(data => {
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
	GetPostagemByCat(POST) {
		return new Promise(function(resolve, reject) {
			var where_add = '';
			var values = [];
			console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA POSTAGEM POR CATEGORIA AAAAAAAAAAAAAAAAAAAAAAA');
			console.log(POST);
			console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
			if (POST.id_usuario != 1) {
				console.log('&&&&&&&&&&&&&&& Não sou administrador &&&&&&&&&&&&&&&&&&');

				if(POST.id_categoria == 3){
					//quer dizer que é uma faculdade
					where_add = "AND id_faculdade = ? AND (filtro_status_faculdade = ? OR filtro_status_faculdade = ?) "
					values = [0, POST.id_usuario, 0, 0, 0, 0, POST.id_categoria,POST.id_faculdade,0,POST.status];
					console.log('((((((((( É FACULDADE ((((((((((((((((((((((((((((')

				}else{

					/*Se for uma Faculdade Vizualizando ela não vê postagens do Divulgador*/
					if(POST.tipo == 2){
						where_add = "AND (id_usuario IN \
						(SELECT id_aluno FROM faculdades_relacoes_aluno WHERE id_faculdade = ? and deletado = ?) \
						AND (\
						(id_grupo = ? OR id_grupo IN \
						(\
						(SELECT id_grupo FROM grupos_usuarios WHERE id_usuario = ? AND deletado = ?)\
						)\
						)\
						AND (\
						id_contato = ? OR id_contato IN \
						(\
						(SELECT id_usuario2 FROM usuarios_contatos WHERE id_usuario = postagens.id_usuario AND deletado = ?)\
						)\
						)\
						)\
						OR id_usuario = ? OR id_usuario = ?)";
						values = [0, POST.id_usuario, 0, 0, 0, 0, POST.id_categoria,POST.id_faculdade, 0, 0, POST.id_usuario, 0, 0, 0, POST.id_usuario,1];
					
					}else{
						where_add = "AND (\
						(id_grupo = ? OR id_grupo IN (SELECT id_grupo FROM grupos_usuarios WHERE id_usuario = ? AND deletado = ?))\
						AND (id_contato = ? OR id_contato = ?)\
						OR id_usuario = ?)";
						values = [0, POST.id_usuario, 0, 0, 0, 0, POST.id_categoria, 0, POST.id_usuario, 0, 0, POST.id_usuario, POST.id_usuario];
					}
				}
			} else {
				values = [0, POST.id_usuario, 0, 0, 0, 0, POST.id_categoria];
			}

			helper.Query('SELECT id, id_usuario, id_contato,\
				(SELECT b.nome_murer FROM usuarios as b WHERE b.deletado = ? AND b.id = postagens.id_usuario) as usuario,\
				(SELECT c.id FROM postagens_gostei as c WHERE c.id_usuario = ? AND c.id_postagem = postagens.id AND c.deletado = ?) as gostei,\
				(SELECT COUNT(d.id) FROM postagens_gostei as d WHERE d.id_postagem = postagens.id AND d.deletado = ? GROUP BY d.id_postagem) as qtd_gostei,\
				(SELECT COUNT(e.id) FROM postagens_comentarios as e WHERE e.id_postagem = postagens.id AND e.deletado = ? GROUP BY e.id_postagem) as qtd_comentario,\
				imagem, descricao, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
				FROM postagens WHERE deletado = ? AND id_categoria = ? ' + where_add, values).then(data => {
					console.log('!!!!!!!!!!! POSTAGENS DA CATEGORIA !!!!!!!!!!!!!!!!!!!!!!!!!!');
					console.log(data);
					console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
					resolve(data);
				});
			});	
	}

	SearchPostagem(pesquisa, id_usuario,id_faculdade,status) {
		return new Promise(function(resolve, reject) {
			var where_add = '';
			var values = [];
			if (pesquisa.indexOf('/') !== -1) {
				pesquisa = pesquisa.split("/").reverse().join("-");
			}
			if ((new Date(pesquisa) !== "Invalid Date") && !isNaN(new Date(pesquisa))) {
				pesquisa = new Date(pesquisa);
				console.log(pesquisa);
				console.log(pesquisa);
				console.log(pesquisa);
				console.log(pesquisa);
				console.log(pesquisa);
			}

			if (id_usuario != 1) {
				where_add = "AND (id_usuario = ? \
				OR ( \
				(a.id_grupo = ? OR a.id_grupo IN (SELECT id_grupo FROM grupos_usuarios WHERE a.id_usuario = ? AND deletado = ?))\
				AND (a.id_contato = ? OR a.id_contato = ?)\
				) AND (\
				(a.id_tipo = ? AND a.deletado = ? AND a.id_faculdade = ? AND (a.filtro_status_faculdade = ? OR a.filtro_status_faculdade = ?)) OR (a.id_tipo != ?)\
				))";
				values = [id_usuario, 0, 0, 0, 0, pesquisa,pesquisa,id_usuario,0,id_usuario, 0, id_usuario, 0, 2, 0,id_faculdade,0,status,2];
			} else {
				values = [id_usuario, 0, 0, 0, 0, pesquisa,pesquisa];
			}
			helper.Query('SELECT a.id, a.id_usuario,\
				b.nome_murer as usuario,\
				(SELECT c.id FROM postagens_gostei as c WHERE c.id_usuario = ? AND c.id_postagem = a.id AND c.deletado = ?) as gostei,\
				(SELECT COUNT(d.id) FROM postagens_gostei as d WHERE d.id_postagem = a.id AND d.deletado = ? GROUP BY d.id_postagem) as qtd_gostei,\
				(SELECT COUNT(e.id) FROM postagens_comentarios as e WHERE e.id_postagem = a.id AND e.deletado = ? GROUP BY e.id_postagem) as qtd_comentario,\
				a.imagem, a.descricao, DATE_FORMAT(a.data_atualizado, "%d/%m/%Y") as data_atualizado\
				FROM postagens as a INNER JOIN usuarios as b ON a.id_usuario = b.id WHERE a.deletado = ? AND\
				(a.descricao LIKE CONCAT(?, "%") OR a.descricao LIKE CONCAT("% ",?,"%"))' + where_add, 
				values).then(data => {
					resolve(data);
				});
			});
	}

	
	GetComentarios(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id,\
				a.texto,\
				a.id_usuario,\
				b.nome_murer as nome\
				FROM postagens_comentarios as a\
				INNER JOIN usuarios as b ON b.id = a.id_usuario\
				WHERE a.id_postagem = ? AND a.deletado = ?', [id, 0]).then(data => {
					resolve(data);
				});
			});
	}
	SearchTipo(tipo, id_usuario) {
		console.log(tipo);
		return new Promise(function(resolve, reject) {
			if (tipo.tipo == 1) {


					// helper.Query('SELECT a.id_grupo as tipo_val, \
					// 	(SELECT b.nome FROM grupos as b WHERE a.id_grupo = b.id) as nome\
					// 	FROM grupos_usuarios as a WHERE id_usuario = ? AND deletado = ?', [id_usuario, 0]).then(data => {
						// helper.Query('SELECT a.id_grupo as tipo_val, b.nome \
						// 							FROM grupos_usuarios as a LEFT JOIN grupos as b ON a.id_grupo = b.id \
						// 							WHERE b.deletado = ? AND a.deletado = ? AND a.id_usuario = ? GROUP BY b.nome ORDER BY nome ASC',[0,0,id_usuario]).then(data=>{
							helper.Query('SELECT b.id as tipo_val, b.nome \
								FROM grupos_usuarios as a\
								INNER JOIN grupos as b ON a.id_grupo = b.id\
								WHERE a.deletado = ? AND b.deletado = ? AND b.id_lider = ? \
								GROUP BY b.nome', [0, 0, id_usuario]).then(data => {
									resolve(data);
								});
							} else {
								helper.Query('SELECT id_usuario2 as tipo_val,\
									b.nome_murer as nome\
									FROM usuarios_contatos as a\
									LEFT JOIN usuarios as b ON b.id = a.id_usuario2\
									WHERE a.deletado = ? AND b.deletado = ? AND a.id_usuario = ?', [0, 0, id_usuario]).then(data => {
										resolve(data);
									});
								}
							});
	}
	SelectUsuarios() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios', []).then(data => {
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
	AddLike(data) {
		return new Promise(function(resolve, reject) {
			// Verificar deletado e ativar/desativar quando estiver o contrario
			helper.Query('SELECT id,deletado FROM postagens_gostei WHERE id_postagem = ? AND id_usuario = ?', [data.id_postagem, data.id_usuario]).then(resposta => {
				if (typeof resposta != 'undefined' && resposta.length > 0) {
					if (resposta[0].deletado == 0) {
						resposta[0].deletado = 1;
						helper.Desativar('postagens_gostei', resposta[0]).then(data => {
							resolve(data);
						});
					} else {
						helper.Ativar('postagens_gostei', resposta[0]).then(data => {
							resolve(data);
						});
					}
				} else {
					helper.Insert('postagens_gostei', data).then(data => {
						resolve(data);
					});
				}
			});
		});
	}

	GetUsuario(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ? AND id = ?', [0, id_usuario]).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}









}
module.exports = PostagensModel;