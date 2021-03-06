'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class UsuariosModel {
	Inicio() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ?', [0]).then(data => {
				resolve(data);
			});
		});
	}
	SelectUsuario() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios', []).then(data => {
				resolve(data);
			});
		});
	}
	GetUsuarioMurer(post) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM usuarios WHERE nome_murer like CONCAT("%", ?, "%") AND deletado = ?', [post.nome_murer, 0]).then(data => {
				resolve(data);
			});
		});
	}

	GetUsuarioMurerGrupo(post){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM grupos_usuarios WHERE deletado = ? AND id_usuario = ? AND id_grupo = ?', [0,post.id_usuario,post.id_grupo]).then(data => {
				resolve(data);
			});
		});
	}

	GetUsuarioFaculdade(post){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id_aluno FROM faculdades_relacoes_aluno WHERE deletado = ? AND id_faculdade = ? AND id_aluno = ?', [0,post.id_faculdade,post.id_aluno]).then(data => {
				resolve(data);
			});
		});
	}

	GetSituacaoAluno(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT status FROM usuarios WHERE id = ?', [id]).then(data => {
				resolve(data);
			});
		});

	}



	GetUsuarioAlterarSenha(id,senhaAtual) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ? AND id = ? AND senha = ?', [0, id,senhaAtual]).then(data => {
				resolve(data);
			});
		});
	}


	GetUsuario(id, id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, \
				(SELECT COUNT(b.id) FROM usuarios_contatos as b WHERE b.id_usuario2 = a.id AND b.id_usuario = ? AND b.deletado = ? LIMIT 1) as amigos,\
				(SELECT NO_IES FROM faculdades_inep as c WHERE id IN (SELECT id_faculdade FROM faculdades_relacoes_aluno as d WHERE d.id_aluno = ? and deletado = ?)) as faculdade,\
				(SELECT NO_CURSO FROM cursos as d WHERE d.id = a.id_curso) as curso,\
				DATE_FORMAT(a.nascimento, "%d/%m/%Y") as nascimento\
				FROM usuarios as a WHERE a.deletado = ? AND a.id = ?', [id_usuario, 0, id, 0, 0, id]).then(data => {
					resolve(data);
				});
			});

	}


	GetUsuarios(data) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id as id_usuario2, nome_murer, imagem, email,tipo, \
				(SELECT COUNT(b.id) FROM usuarios_contatos as b WHERE b.id_usuario2 = a.id AND b.id_usuario = ? AND b.deletado = ? LIMIT 1) as amigos\
				FROM usuarios as a WHERE deletado = ? AND (nome_murer like CONCAT("%", ?, "%") OR nome like CONCAT("%", ?, "%") OR email like CONCAT("%", ?, "%"))', [data.id_usuario,0,0, data.pesquisar, data.pesquisar, data.pesquisar]).then(data => {
					resolve(data);
				});
			});
	}

	GetUsuariosFaculdade(data,id_faculdade,id_usuario_facul) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id as id_usuario2, a.nome_murer, a.imagem, a.email, ? as aluno_faculdade, \
				(SELECT deletado FROM faculdades_relacoes_aluno as b WHERE b.id_faculdade = ? AND b.id_aluno = a.id) as aluno,\
				(SELECT id FROM faculdades_relacoes_aluno as c WHERE c.id_faculdade = ? AND c.id_aluno = a.id) as id_relacao \
				FROM usuarios as a WHERE a.deletado = ? AND a.id_faculdade = ? AND a.id != ? AND (a.nome_murer like CONCAT("%", ?, "%") OR a.nome like CONCAT("%", ?, "%") OR a.email like CONCAT("%", ?, "%"))', [1,id_faculdade, id_faculdade, 0, id_faculdade,id_usuario_facul ,data.pesquisar, data.pesquisar, data.pesquisar]).then(data => {
					resolve(data);
				});
			});
	}

	GetUsuarioGrupos(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT b.id, b.nome, b.id_lider FROM grupos_usuarios as a\
				INNER JOIN grupos as b ON a.id_grupo = b.id\
				WHERE a.deletado = ? AND b.deletado = ? AND b.id_lider = ? GROUP BY b.nome', [0, 0, id_usuario]).then(data => {
					resolve(data);
				});
			});
	}
	GetUsuarioContatos(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT b.nome_murer,\
				b.email,\
				b.imagem,\
				a.id_usuario2, a.id\
				FROM usuarios_contatos as a\
				LEFT JOIN usuarios as b ON b.id = a.id_usuario2\
				WHERE a.deletado = ? AND b.deletado = ? AND a.id_usuario = ?', [0, 0, id]).then(data => {
					resolve(data);
				});
			});
	}

	GetGrupo(id, id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, (SELECT COUNT(b.id) FROM grupos_usuarios as b WHERE b.id_usuario = ? AND b.id_grupo = a.id AND b.deletado = ? LIMIT 1) as pertence\
				FROM grupos as a WHERE a.deletado = ? AND a.id = ?', [id_usuario, 0, 0, id]).then(data => {
					resolve(data);
				});
			});
	}

	GetGrupos(data) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id, a.nome, a.id_lider FROM grupos as a\
				WHERE a.deletado = ? AND\
				(a.nome like CONCAT("%", ?, "%") OR a.descricao like CONCAT("%", ?, "%"))', [0, data.pesquisar, data.pesquisar]).then(data => {
					resolve(data);
				});
			});
	}

	GetUsuariosGrupo(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id as id_grupo_usuario, a.id_grupo, b.id, b.nome_murer,\
				(SELECT c.id_lider FROM grupos as c WHERE c.id = a.id_grupo) as id_lider\
				FROM grupos_usuarios as a INNER JOIN usuarios as b ON a.id_usuario = b.id\
				WHERE a.deletado = ? AND a.id_grupo = ?', [0, id]).then(data => {
					resolve(data);
				});
			});
	}

	GetPostagemByUser(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, id_usuario,\
				(SELECT b.nome_murer FROM usuarios as b WHERE b.deletado = ? AND b.id = postagens.id_usuario) as usuario,\
				imagem, descricao, DATE_FORMAT(data_atualizado, "%d/%m/%Y") as data_atualizado\
				FROM postagens WHERE deletado = ? AND id_usuario = ?', [0, 0, id]).then(data => {
					resolve(data);
				});
			});	
	}

	PesquisarUsuario(nomeMurer) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM usuarios WHERE nome_murer = ?', [nomeMurer]).then(result => {
				resolve(result);
			});
		});
	}

	InsertContato(post) {
		var post2 = {};
		post2.id_usuario = post.id_usuario2;
		post2.id_usuario2 = post.id_usuario;
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM usuarios_contatos WHERE id_usuario = ? AND id_usuario2 = ? AND deletado = ?', [post.id_usuario, post.id_usuario2, 0]).then(result => {
				if (result.length <= 0) {
					helper.Insert('usuarios_contatos', post).then(data => {
						helper.Insert('usuarios_contatos', post2).then(data => {
							resolve(data);
						});
					});
				} else {
					resolve([]);
				}
			});
		});	
	}


	InsertVariosContatos(POST){
		var POST2 = {};

		var id_usuario = {id_usuario:POST.lista.id_usuario2};
		POST2.lista = id_usuario;

		POST.lista = helper.PrepareMultiple(POST.lista, 'id_usuario', POST.id_usuario);
		POST2.lista = helper.PrepareMultiple(POST2.lista,'id_usuario2',POST.id_usuario);

		return new Promise(function(resolve, reject) {
			helper.InsertMultiple('usuarios_contatos', POST.lista).then(id_insercao1 => {
				helper.InsertMultiple('usuarios_contatos', POST2.lista).then(id_insercao2 => {
					resolve(id_insercao2);
				});
			});
		});

	}

	DesativarContato(post) {
		var post2 = {};
		post2.id_usuario = post.id_usuario2;
		post2.id_usuario2 = post.id_usuario;
		return new Promise(function(resolve, reject) {
			helper.Query('UPDATE usuarios_contatos SET deletado = ? WHERE id_usuario = ? AND id_usuario2 = ?', [1, post.id_usuario, post.id_usuario2]).then(data => {
				helper.Query('UPDATE usuarios_contatos SET deletado = ? WHERE id_usuario = ? AND id_usuario2 = ?', [1, post.id_usuario2, post.id_usuario]).then(data => {
					resolve(data);
				});
			});
		});	
	}
	
	SairGrupo(post) {
		return new Promise(function(resolve, reject) {
			helper.Query('UPDATE grupos SET deletado = ? WHERE id = ? AND id_lider = ?', [1, post.id_grupo, post.id_usuario]).then(data => {
				resolve(data);
			});
		});
	}

	EntrarGrupo(post) {
		return new Promise(function(resolve, reject) {
			helper.Insert('grupos_usuarios', post).then(data => {
				resolve(data);
			});
		});
	}

	InsertUsuario(post) {
		return new Promise(function(resolve, reject) {
			helper.Insert('usuarios', post).then(data => {
				resolve(data);
			});
		});
	}

	InsertGrupo(post,post2) {
		return new Promise(function(resolve, reject) {
			helper.Insert('grupos', post).then(data => {
				post2.id_grupo = data;
				helper.Insert('grupos_usuarios', post2).then(data => {
					resolve(data);
				});
			});
		});
	}

	CadastrarUsuario(post) {
		return new Promise(function(resolve, reject) {
			helper.Insert('usuarios', post).then(data => {
				resolve(data);
			});
		});
	}

	UpdateUsuario(post) {
		return new Promise(function(resolve, reject) {
			helper.Update('usuarios', post).then(data => {
				resolve(data);
			});
		});
	}

	//Dar update na rela????o de faculdades com alunos quando o usuario no perfil alterar sua faculdade
	//para tal ?? necess??rio encontrar o id vinculado ao aluno, depois disso dar update com o id da faculdade_relacoes_aluno

	UpdateUsuarioFaculdadeRelacao(post){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM faculdades_relacoes_aluno WHERE id_aluno = ? LIMIT 1', [post.id]).then(id_relacoes_aluno => {
				var post_relacao = {id:id_relacoes_aluno[0].id,id_faculdade:post.id_faculdade};	
				helper.Update('faculdades_relacoes_aluno', post_relacao).then(data => {
					resolve(data);
				});
			});
		});

	}

	AdicionarVariosAlunosUpdate(POST){
		POST.lista = helper.PrepareMultiple(POST.lista, 'deletado', 0);
		return new Promise(function(resolve, reject) {
			helper.UpdateMultiple('faculdades_relacoes_aluno', POST.lista).then(id_insercao1 => {
				resolve(id_insercao1);
			});
		});

	}		


	RemoverVariosAlunosUpdate(POST){

		var id_faculdade = POST.id_faculdade;

		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM faculdades_relacoes_aluno WHERE id_faculdade = ?', [id_faculdade]).then(id_todos_alunos => {
				
				/*vejo todos os alunos chave por chave*/
				for(var key in id_todos_alunos){
					/*se a lista estiver vazia, ou seja foi desmarcado tudo n??o precisa
					fazer essa valida????o pois n??o h?? nada para deletar, ele quer remover
					todos os usu??rios*/
					if(POST.lista != undefined){
						/*vejo os alunos que foram ''selecionados'' porque eu na verdade fa??o o inverso
						eu vejo os que foram selecionados e a partir da?? eu removo eles,pois preciso alterar
						os que N??O foram selecionados*/
						for(var key2 in POST.lista.id){
							/*se os ids forem iguais da lista que recebi eu removo, ent??o sobra os
							outros que devem ser deletados*/
							if(id_todos_alunos[key].id == POST.lista.id[key2]){
								delete id_todos_alunos[key].id;
							}
						}
					}
				}

				/*Limpo o array dos itens que ficaram indefinidos,pois quando deleta
				ele fica com undefined na posi????o da chave*/
				Object.keys(id_todos_alunos).forEach(key => id_todos_alunos[key].id === undefined && delete id_todos_alunos[key]);

				/*crio dois arrays auxiliares para poder colocar os ids e os deletados*/
				var arrayid = [];
				var arraydeletado = [];

				for(var key4 in id_todos_alunos){
					/*para cada item que tem em todos os alunos (depois de limpo) eu dou push no
					array, e fa??o o mesmo para o deletado para ter a mesma quantidade
					de id e deletado*/
					arrayid.push(id_todos_alunos[key4].id);
					arraydeletado.push(1);
				}

				/*crio uma nova lista porque pode acontecer de eu deletar todos os usuario
				e ent??o n??o vai enviar uma lista */
				POST.novalista = [];

				POST.novalista.id = arrayid;
				POST.novalista.deletado = arraydeletado;

				/*depois daqui o POST.novalista j?? est?? certo ent??o ?? s?? dar update*/
				helper.UpdateMultiple('faculdades_relacoes_aluno', POST.novalista).then(id_insercao1 => {
					resolve(id_insercao1);
				});
			});
		});
	}	

	UpdateFoto(post) {
		return new Promise(function(resolve, reject) {
			helper.Update('usuarios', post).then(data => {
				resolve(data);
			});
		});
	}

	DesativarUsuario(post) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('usuarios', post).then(data => {
				resolve(data);
			});
		});
	}

	DesativarUsuarioGrupo(post) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('grupos_usuarios', post).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = UsuariosModel;