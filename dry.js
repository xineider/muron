'use strict';
var express = require('express');
var app = express();
var Helper = require('./helper.js');
var helper = new Helper;

// FAZER LEITURA DAS CONFIGURAÇÕES
var config = helper.Config();

// CONEXÃO MYSQL
var mysql      = require('mysql');
var connection = mysql.createConnection(config['mysql']);
connection.connect();
var query = '';
var array = [];

class Dry {
	Inicio() {
		// Para retornar quando chamar a função
		return new Promise(function(resolve, reject) {
			var bla = [];
			// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
			query = 'SELECT * FROM usuarios';
			array = [];
			
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			connection.query(query, array, function (error, results, fields) {
				bla = results;
				resolve(results);
			});
		});
	}
	Empresas() {
		return new Promise(function(resolve, reject) {
			// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
			query = 'SELECT * FROM empresas WHERE deletado = ? ORDER BY id';
			array = [0];

			// Adicione a query com scape(?) e os respectivos valores em um array simples
			connection.query(query, array, function (error, results, fields) {
			  if (error && query != '') console.log('ERROR SQL ------------- '+error+' ------------- SQL ERROR');
			  resolve(results);

			});
		});

	}

	Obras(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, nome as nome_obra, DATE_FORMAT(datainicio, "%d/%m/%Y") as datainicio, DATE_FORMAT(datafim, "%d/%m/%Y") as datafim FROM obra WHERE deletado = ? ORDER BY id',[0]).then(data => {
				resolve(data);
			});
		});

	}

	Ver_Obras(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, nome as nome_obra FROM obra WHERE deletado = ? ORDER BY id',[0]).then(data => {
				resolve(data);
			});
		});

	}



	Compras(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT b.nome, a.* FROM orcamento as a INNER JOIN obra as b ON a.id_obra=b.id WHERE deletado = ? ORDER BY id',[0]).then(data => {
				resolve(data);
			});
		});

	}

	Pedidos(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, DATE_FORMAT(a.data_cadastro, "%d/%m/%Y") as data_cadastro, b.nome as nome_obra ,c.nome as nome_usuario FROM pedido as a INNER JOIN obra as b ON a.id_obra=b.id INNER JOIN usuario as c ON a.id_usuario=c.id WHERE a.deletado = ? ORDER BY a.id',[0]).then(data => {
				resolve(data);
			});
		});

	}



	Ver_Usuarios(){
			return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, nome as nome_usuario FROM usuario WHERE deletado = ? ORDER BY id',[0]).then(data => {
				resolve(data);
			});
		});
	}

	
	EditarEmpresas() {
		return new Promise(function(resolve, reject) {
		});
	}
	Configuracoes() {
		return new Promise(function(resolve, reject) {
			// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
			query = 'SELECT * FROM empresas WHERE deletado = ? ORDER BY id';
			array = [0];

			// Adicione a query com scape(?) e os respectivos valores em um array simples
			connection.query(query, array, function (error, results, fields) {
			  if (error && query != '') console.log('ERROR SQL ------------- '+error+' ------------- SQL ERROR');
			  resolve(results);

			});
		});

	}
}
module.exports = Dry;