'use strict';
var crypto = require('crypto');

class Control {
	// Retorne o parametro encriptado;
	Encrypt(str) {
	  return crypto.createHash('md5').update('558874c2cac326fc5e331c4a5a6dddce'+str+'706eb043788d92a44a2308146256c1bd').digest("hex");
	}
	Unserialize(data) {
		var array = [];
		data = data.split('&');
		for (var i = data.length - 1; i >= 0; i--) {
			var array_pre = [];
			array_pre = data[i].split('=');
			array[array_pre[0]] = array_pre[1];
		}
		return array;
	}
	Isset(data, tipo) {
		if (tipo == false) {
			if (data == undefined || data == 'undefined') {
				return true;
			} else {
				return false;
			}
		} else {
			if (data == undefined || data == 'undefined') {
				return false;
			} else {
				return true;
			}
		}
	}
}
module.exports = Control;