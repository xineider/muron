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
	
	GetPostagensTodas(POST) {
		return new Promise(function(resolve, reject) {
			var where_add = '';
			var values = [];

			console.log('GGGGGGGGGGGGGGGGGGGGGG GET POSTAGENS TODAS GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
			console.log(POST);
			console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');

			if (POST.id_usuario != 1) {
				where_add = "AND id_usuario = ? \
				OR (\
				(id_grupo = ? OR id_grupo IN (SELECT id_grupo FROM grupos_usuarios WHERE id_usuario = ? AND deletado = ?))\
				AND (id_contato = ? OR id_contato IN (SELECT id_usuario2 FROM usuarios_contatos WHERE id_usuario2 = ? AND deletado = ?))\
				)\
				AND (\
				(id_tipo = ? AND id_faculdade = ? AND (filtro_status_faculdade = ? OR filtro_status_faculdade = ?)) OR (id_tipo != ?)\
				)";
				values = [0, POST.id_usuario, 0, 0, 0, 0, POST.id_usuario, 0, POST.id_usuario, 0, 0, POST.id_usuario, 0, 2, POST.id_faculdade,0, POST.status, 2];
			} else {
				values = [0, POST.id_usuario, 0, 0, 0, 0];
			}
			helper.Query('SELECT id, id_usuario, id_contato,\
				(SELECT b.nome_murer FROM usuarios as b WHERE b.deletado = ? AND b.id = postagens.id_usuario) as usuario,\
				(SELECT c.id FROM postagens_gostei as c WHERE c.id_usuario = ? AND c.id_postagem = postagens.id AND c.deletado = ?) as gostei,\
				(SELECT COUNT(d.id) FROM postagens_gostei as d WHERE d.id_postagem = postagens.id AND d.deletado = ? GROUP BY d.id_postagem) as qtd_gostei,\
				(SELECT COUNT(e.id) FROM postagens_comentarios as e WHERE e.id_postagem = postagens.id AND e.deletado = ? GROUP BY e.id_postagem) as qtd_comentario,\
				imagem, descricao, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
				FROM postagens WHERE deletado = ? ' + where_add, values).then(data => {
					
					
					resolve(data);
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
	
	GetPostagensTodasFaculdade(POST){
		return new Promise(function(resolve, reject) {
			var where_add = '';
			var values = [];
			
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
			values = [0, POST.id_usuario, 0, 0, 0, 0, POST.id_faculdade, 0, 0, POST.id_usuario, 0, 0, 0, POST.id_usuario,1];
			
			helper.Query('SELECT id, id_usuario, id_contato,\
				(SELECT b.nome_murer FROM usuarios as b WHERE b.deletado = ? AND b.id = postagens.id_usuario) as usuario,\
				(SELECT c.id FROM postagens_gostei as c WHERE c.id_usuario = ? AND c.id_postagem = postagens.id AND c.deletado = ?) as gostei,\
				(SELECT COUNT(d.id) FROM postagens_gostei as d WHERE d.id_postagem = postagens.id AND d.deletado = ? GROUP BY d.id_postagem) as qtd_gostei,\
				(SELECT COUNT(e.id) FROM postagens_comentarios as e WHERE e.id_postagem = postagens.id AND e.deletado = ? GROUP BY e.id_postagem) as qtd_comentario,\
				imagem, descricao, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
				FROM postagens WHERE deletado = ? ' + where_add, values).then(data => {
					console.log('PPPPPPPPPPPPPPPP POSTAGENS FACULDADE PPPPPPPPPPPPPPPPPPPPPPPPPP');
					console.log(data);
					console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
					resolve(data);
				});
			});
	}
	
	
	// 	GetCategorias() {
	// 		return new Promise(function(resolve, reject) {
	// 			helper.Query('SELECT a.id, a.nome, count(*) as atualizacoes\
	// FROM postagens_categorias as a\
	//     INNER JOIN postagens_categorias_view as b ON a.id = b.id_categoria\
	//     INNER JOIN postagens as c on c.id_categoria = a.id\
	// WHERE a.deletado = ? AND\
	//     c.deletado = ? AND\
	//     a.id != ? AND \
	//     c.data_cadastro > b.data_acesso\
	// GROUP BY a.id, a.nome\
	// ORDER BY a.nome DESC', [0, 0, 3]).then(data => {
	// 				resolve(data);
	// 			});
	// 		});	
	// 	}
	
	// SELECT a.id, a.nome, count(*) as atualizacoes
	// FROM postagens_categorias as a
	//     INNER JOIN postagens_categorias_view as b ON a.id = b.id_categoria
	//     INNER JOIN postagens as c on c.id_categoria = a.id
	// WHERE a.deletado = 0 AND
	//     c.deletado = 0 AND
	//     a.id != 3 AND 
	//     c.data_cadastro > b.data_acesso
	// GROUP BY a.id, a.nome
	// ORDER BY a.nome DESC
	
	
	GetCategorias() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, nome FROM postagens_categorias WHERE deletado = ? AND id != ? ORDER BY nome DESC', [0, 3]).then(data => {
				resolve(data);
			});
		});	
	}
	
	// GetCategoriasAtualizacoes(POST) {
	// 	return new Promise(function(resolve, reject) {
	// 		helper.Query('SELECT DISTINCT a.id, a.nome,\
	// 			(SELECT COUNT(c.id) FROM postagens as c WHERE c.data_cadastro > b.data_acesso AND c.id_categoria = a.id AND deletado = ?) as atualizacoes\
	// 			FROM postagens_categorias as a\
	// 			LEFT JOIN postagens_categorias_view as b ON a.id = b.id_categoria\
	// 			WHERE a.deletado = ? AND a.id != ? ORDER BY a.nome,atualizacoes DESC', [0, 0, 3]).then(data => {
	// 				resolve(data);
	// 			});
	// 		});	
	// }
	
	GetCategoriasAtualizacoes(POST) {
		return new Promise(function(resolve, reject) {
			/*Seleciona as datas de cadastro que forem maiores que o usuario acessou de 
			acordo com a categoria selecionada*/
			var selectGeral = 'SELECT a.id FROM postagens as a \
			LEFT JOIN postagens_categorias_view as b ON a.id_categoria = b.id_categoria\
			WHERE \
			(a.data_cadastro > b.data_acesso AND b.id_usuario = ? and b.id_categoria = ? AND a.deletado = ?)';
			var valuesGeral = [POST.id_usuario, POST.id_categoria, 0];
			/*Dígito verificador somente para ser utilizado para entrar primeiros nos ifs
			e depois ir para o select, se não podia acontecer de o usuario normal ter permissões de visualização
			do Admin*/
			var verificador = 0;

			/*Faço um teste para saber se é o admin ou não*/
			if(POST.id_usuario != 1){
				/*Seleciona Somente as data de cadastro que forem maiores que o usuario acessou
				de acordo com a categoria selecionada, se a postagem é para geral,ou
				se ele pertence a faculdade,ou se ele	está no grupo, ou se ele está no contato específico*/
				selectGeral = selectGeral + ' AND(\
				(a.id_tipo != ? AND a.id_categoria = ? AND tipo = ?)\
				OR (a.id_tipo = ? AND a.id_categoria = ? AND tipo = ? AND a.id_faculdade = ?)\
				OR (a.id_grupo IN (SELECT id_grupo FROM grupos_usuarios WHERE id_usuario = ? AND deletado = ?))\
				OR (a.id_contato IN (SELECT id_usuario2 FROM usuarios_contatos WHERE id_usuario = a.id_usuario AND deletado = ?))\
				) GROUP BY a.id';

				valuesGeral = [POST.id_usuario,POST.id_categoria,0, 2,POST.id_categoria, 0, 2, POST.id_categoria, 0, POST.id_faculdade,POST.id_usuario,0,0];
				verificador = 1;
			}else{
				/*somente para setar quando o usuário não é o Admin, para cair no if abaixo,
				pois o admin não precisa fazer todos os filtros de faculdade/grupo/contato*/
				selectGeral = selectGeral + ' GROUP BY a.id'
				verificador = 1;
			}

			if(verificador == 1){
				helper.Query(selectGeral,valuesGeral).then(data => {
					helper.Query('SELECT ? as atualizacoes, ? as icone, ? as link,\
						(SELECT id FROM postagens_categorias WHERE id = ? ) as id,\
						(SELECT nome FROM postagens_categorias WHERE id = ? ) as nome\
						FROM postagens LIMIT 1',[data.length,POST.icone, POST.link,POST.id_categoria,POST.id_categoria]).then(atualizacoes =>{
							console.log('0000000000000000000000000 atualizacoes 00000000000000000000');
							console.log(atualizacoes);
							console.log('00000000000000000000000000000000000000000000000000000000000');
							resolve(atualizacoes);
						});	
					});
			};
		});	
	}

	// 	GetCategoriasAtualizacoes(POST) {
	// 	return new Promise(function(resolve, reject) {
	// 		var where_add = 'AND (a.data_cadastro > b.data_acesso AND b.id_usuario = ? and b.id_categoria = ?) \
	// 		OR (a.id_tipo = ? AND a.id_faculdade = ? AND a.id_categoria = ?) AND\
	// 		((a.id_grupo = ? OR a.id_grupo IN ((SELECT id_grupo FROM grupos_usuarios WHERE id_usuario = ? AND deletado = ?)))\
	// 		AND (a.id_contato = ? OR a.id_contato IN ((SELECT id_usuario2 FROM usuarios_contatos WHERE id_usuario = a.id_usuario AND deletado = ?))))\
	// 		GROUP BY a.id';
	// 		var retorno = {};
	// 		var values = [0, 2,POST.id_categoria,POST.id_usuario,POST.id_categoria,2,POST.id_faculdade,POST.id_categoria,0,POST.id_usuario,0,0,0];

	// 		helper.Query('SELECT a.id FROM postagens as a \
	// 			LEFT JOIN postagens_categorias_view as b ON a.id_categoria = b.id_categoria\
	// 			WHERE a.deletado = ? AND a.id_tipo != ? AND a.id_categoria = ?  \
	// 			' + where_add, values).then(data => {	
	// 				helper.Query('SELECT ? as atualizacoes, ? as icone, ? as link,\
	// 					(SELECT id FROM postagens_categorias WHERE id = ? ) as id,\
	// 					(SELECT nome FROM postagens_categorias WHERE id = ? ) as nome\
	// 					FROM postagens LIMIT 1',[data.length,POST.icone, POST.link,POST.id_categoria,POST.id_categoria]).then(atualizacoes =>{
	// 						console.log('0000000000000000000000000 atualizacoes 00000000000000000000');
	// 						console.log(atualizacoes);
	// 						console.log('00000000000000000000000000000000000000000000000000000000000');
	// 						resolve(atualizacoes);
	// 					});				
	// 				});			
	// 		});	
	// }
	
	GetCategoriasAtualizacoesFaculdade(POST) {
		return new Promise(function(resolve, reject) {
			console.log('DDDDDDDDDDDDDDDD DADOS DAS CATEGORIAS ATUALIZAÇÕES DDDDDDDDDDDDDDDD');
			console.log(POST);
			console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');

			var selectGeral = 'SELECT a.id FROM postagens as a \
			LEFT JOIN postagens_categorias_view as b ON a.id_categoria = b.id_categoria\
			WHERE \
			(a.data_cadastro > b.data_acesso AND b.id_usuario = ? and b.id_categoria = ? AND a.deletado = ?) \
			AND( \
			(a.tipo = 0 AND  AND a.id_usuario IN (SELECT id_aluno FROM faculdades_relacoes_aluno WHERE id_faculdade = ? AND deletado = ?))  \
			OR ()\
			)' ;

			var where_add = ' AND ((id_grupo = ? OR id_grupo IN ((SELECT id_grupo FROM grupos_usuarios WHERE id_usuario = ? AND deletado = ?))) \
			AND (id_contato = ? OR id_contato IN ((SELECT id_usuario2 FROM usuarios_contatos WHERE id_usuario = postagens.id_usuario AND deletado = ?))) \
			AND (SELECT data_acesso FROM postagens_categorias_view WHERE id_usuario = ? AND postagens.data_cadastro > data_acesso AND id_categoria = ?) \
			OR id_usuario = ?)';
			
			var values = [POST.icone,POST.link,POST.id_categoria,POST.id_categoria,0,POST.id_faculdade,POST.id_categoria,0,POST.id_usuario,0,0,0,POST.id_usuario,POST.id_categoria,POST.id_usuario];
			
			helper.Query('SELECT COUNT(id) as atualizacoes, ? as icone,? as link,\
				(SELECT id FROM postagens_categorias WHERE id = ? ) as id,\
				(SELECT nome FROM postagens_categorias WHERE id = ? ) as nome\
				FROM postagens WHERE deletado = ? AND id_faculdade = ? AND id_categoria = ?' + where_add, values).then(data => {
					console.log('---------------- Atualizacoes FACULDADE ---------------------');
					console.log(data);
					console.log('---------------------------------------------------');
					resolve(data);
				});			
			});	
		
	}	
	
	/*Função que adiciona nas postagens_categorias_view as categorias
	 se o usuário for novo ou não, 
	se ele for novo é adicionado as 4 categorias e adicionado as qtd_acesso
	se for um usuário recorrente ele passa direto*/
	VeifyViews(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT COUNT(id) as qtd FROM postagens_categorias_view WHERE id_usuario = ?', [id_usuario]).then(data => {
				console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIII ID_USUARIO IIIIIIIIIIIIIIIIIIIIIIIIIIIII');
				console.log(id_usuario);
				console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
				console.log('((((((((((((((((( Veify Views ((((((((((((((((((((((((((((((((');
				console.log(data);
				console.log('((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((');
				
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