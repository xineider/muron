'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class IndexModel {
	Login(POST) {
		POST.senha = helper.Encrypt(POST.senha);
		// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
		query = 'SELECT id FROM usuarios WHERE login = ? AND senha = ?';
		array = [POST.login, POST.senha];
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			hlper.Query(query, array).then(data => {
				resolve(data);
			});
		});
	}
	SelectUsuarios() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios', []).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
	GetPostagensTodas(id_usuario) {

		return new Promise(function(resolve, reject) {
			var where_add = '';
			var values = [];
			if (id_usuario != 1) {
				where_add = "AND ((id_grupo = ? OR id_grupo IN ((SELECT id_grupo FROM grupos_usuarios WHERE id_usuario = ? AND deletado = ?)))\
							AND (id_contato = ? OR id_contato IN ((SELECT id_usuario2 FROM usuarios_contatos WHERE id_usuario = postagens.id_usuario AND deletado = ?)))\
							OR id_usuario = ?)";
				values = [0, id_usuario, 0, 0, 0, 0, 0, id_usuario, 0, 0, 0, id_usuario];
			} else {
				values = [0, id_usuario, 0, 0, 0, 0];
			}
			helper.Query('SELECT id, id_usuario, id_contato,\
						(SELECT b.nome_murer FROM usuarios as b WHERE b.deletado = ? AND b.id = postagens.id_usuario) as usuario,\
						(SELECT c.id FROM postagens_gostei as c WHERE c.id_usuario = ? AND c.id_postagem = postagens.id AND c.deletado = ?) as gostei,\
						(SELECT COUNT(d.id) FROM postagens_gostei as d WHERE d.id_postagem = postagens.id AND d.deletado = ? GROUP BY d.id_postagem) as qtd_gostei,\
						(SELECT COUNT(e.id) FROM postagens_comentarios as e WHERE e.id_postagem = postagens.id AND e.deletado = ? GROUP BY e.id_postagem) as qtd_comentario,\
						imagem, descricao, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
						FROM postagens WHERE deletado = ? ' + where_add, values).then(data => {
				console.log('1111111111111111111111 GET POSTAGENS 1111111111111111111');
				console.log(data);
				console.log('11111111111111111111111111111111111111111111111111111111');

				resolve(data);
			});
		});	
	}
	GetCategorias() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT DISTINCT a.id, a.nome,\
						 (SELECT COUNT(c.id) FROM postagens as c WHERE c.data_cadastro > b.data_acesso AND c.id_categoria = a.id AND deletado = ?) as atualizacoes\
						 FROM postagens_categorias as a\
						 LEFT JOIN postagens_categorias_view as b ON a.id = b.id_categoria\
						 WHERE a.deletado = ? AND a.id != ? ORDER BY a.nome DESC', [0, 0, 3]).then(data => {
				console.log('2222222222222222222 GET CATEGORIAS 2222222222222222222222222');
				console.log(data);
				console.log('222222222222222222222222222222222222222222222222222222222222');
				resolve(data);
			});
		});	
	}
	VeifyViews(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT COUNT(id) as qtd FROM postagens_categorias_view WHERE id_usuario = ?', [id_usuario]).then(data => {
				if (data[0].qtd > 0) {
					resolve('');
				} else {
					helper.Query("INSERT INTO postagens_categorias_view (id_categoria, id_usuario, qtd_acesso)\
						VALUES\
						(1, "+id_usuario+", 0),\
						(2, "+id_usuario+", 0),\
						(3, "+id_usuario+", 0),\
						(4, "+id_usuario+", 0);", [id_usuario]).then(data => {
							resolve(data);
					});
				}
			});
		});
	}
	GetPosts(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id,\
						(SELECT nome FROM usuarios WHERE id = ? AND deletado = ?) as usuario,\
						imagem, descricao, contato, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
						FROM postagens WHERE deletado = ? AND id_categoria = ?', [id, 0, 0, id]).then(data => {
				resolve(data);
			});
		});	
	}
	GetPostagens(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, id_usuario,\
						(SELECT b.nome_murer FROM usuarios as b WHERE b.deletado = ? AND b.id = postagens.id_usuario) as usuario,\
						(SELECT c.id FROM postagens_gostei as c WHERE c.id_usuario = ? AND c.id_postagem = postagens.id AND c.deletado = ?) as gostei,\
						(SELECT COUNT(d.id) FROM postagens_gostei as d WHERE d.id_postagem = postagens.id AND d.deletado = ? GROUP BY d.id_postagem) as qtd_gostei,\
						(SELECT COUNT(e.id) FROM postagens_comentarios as e WHERE e.id_postagem = postagens.id AND e.deletado = ? GROUP BY e.id_postagem) as qtd_comentario,\
						imagem, descricao, id_contato, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
						FROM postagens WHERE deletado = ? AND id_usuario = ?', [0, id, 0, 0, 0, 0, id]).then(data => {
				resolve(data);
			});
		});	
	}
	Inicio() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios', []).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
}
module.exports = IndexModel;