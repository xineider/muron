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
	GetPostagemByCat(id, id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, id_usuario,\
						(SELECT b.nome_murer FROM usuarios as b WHERE b.deletado = ? AND b.id = postagens.id_usuario) as usuario,\
						(SELECT c.id FROM postagens_gostei as c WHERE c.id_usuario = ? AND c.id_postagem = postagens.id AND c.deletado = ?) as gostei,\
						(SELECT COUNT(d.id) FROM postagens_gostei as d WHERE d.id_postagem = postagens.id AND d.deletado = ? GROUP BY d.id_postagem) as qtd_gostei,\
						(SELECT COUNT(e.id) FROM postagens_comentarios as e WHERE e.id_postagem = postagens.id AND e.deletado = ? GROUP BY e.id_postagem) as qtd_comentario,\
						imagem, descricao, contato, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
						FROM postagens WHERE deletado = ? AND id_categoria = ?', [0, id_usuario, 0, 0, 0, 0, id]).then(data => {
							console.log(data);
				resolve(data);
			});
		});	
	}
	SearchPostagem(post, id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, id_usuario,\
						(SELECT b.nome_murer FROM usuarios as b WHERE b.deletado = ? AND b.id = postagens.id_usuario) as usuario,\
						(SELECT c.id FROM postagens_gostei as c WHERE c.id_usuario = ? AND c.id_postagem = postagens.id AND c.deletado = ?) as gostei,\
						(SELECT COUNT(d.id) FROM postagens_gostei as d WHERE d.id_postagem = postagens.id AND d.deletado = ? GROUP BY d.id_postagem) as qtd_gostei,\
						imagem, descricao, contato, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
						FROM postagens WHERE deletado = ? AND descricao like CONCAT("%", ?, "%")', [0, id_usuario, 0, 0, post.pesquisa]).then(data => {
							console.log(data);
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
}
module.exports = PostagensModel;