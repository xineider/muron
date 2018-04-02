'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class VerificacaoModel {
  VerificarUsuario(id, hash, tipo) {
    return new Promise(function(resolve, reject) {
      console.log([id, hash]);
      helper.Query('SELECT id,nome_murer,email FROM usuarios WHERE id = ? AND hash_login = ? AND tipo = ? AND deletado = ?', [id, hash, tipo, 0]).then(data => {
        resolve(data);
      });
    });
  }
  GetConfig(id) {
    return new Promise(function(resolve, reject) {
      helper.Query('SELECT * FROM configuracoes WHERE id_usuario = ?', [id]).then(data => {
        resolve(data);
      });
    });
  }
  AddLog(ip, method, rota, user_agent, id_usuario) {
    return new Promise(function(resolve, reject) {
      helper.Insert('log', {ip: ip, method: method, rota: rota, user_agent: user_agent, id_usuario: id_usuario}).then(data => {
        resolve(data);
      });
    });
  }
}
module.exports = VerificacaoModel;
