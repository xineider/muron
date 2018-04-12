// Eventos DOM
$(document).on('ready', function () {
	$('.modal').modal();
	InitBar();
	adicionarLoader();
	FormatInputs();
	GoTo(location.pathname, false);

	$(document).ajaxComplete(function () {
		FormatInputs();
		Materialize.updateTextFields();
	});

	$(document).on('click', '.modal-remover-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var texto = $(this).data('texto');
		var id = $(this).data('id');
		var to = $(this).data('to');
		var back = $(this).data('back');

		$(modal).modal('open');
		$(modal).find('#texto').text(texto);
		$(modal).find('#id').val(id);
		$(modal).find('button').data('href', to).data('action', back);
	});
	$(document).on('click', '.modal-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var link = $(this).data('link');
		MountModal(modal, link);
	});
	$(document).on('click', '.modal-input', function (e) {
		e.preventDefault();
		$('#modalinput label').text($(this).data('nome'));
		$('#modalinput input:not(#id)').prop('name', $(this).data('collum'));
		$('#modalinput #id').val($(this).data('id'));
		$('#modalinput').modal('open');
	});

	$(document).on('click', '.ajax-load', function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		var top = $(this).data('top');
		
		GoTo(link, true, top);
	});
	$(document).on('click', '.ajax-load-to', function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		var to = $(this).data('to');
		LoadTo(link, to);
	});
	// $(document).on('click', '.remove', function (e) {
	// 	e.preventDefault();
	// 	$(this).closest('.pai').remove();
	// });
	$(document).on('click', '.ajax-submit', function(e) {
		e.preventDefault();
		var form = $(this).closest('form');
		
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back, method);
		}
	});
	$(document).on('click', '.ajax-send', function(e) {
		e.preventDefault();
		var form = $(this).closest('form');
		
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SendAjax(post, link, back, method);
		}
	});
	$(document).on('click', '.ajax-search', function(e) {
		e.preventDefault();
		var form = $(this).closest('form');
		
		var post = form.serializeArray();
		var link = $(this).data('href');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SearchAjax(post, link, method, 'main');
		}
	});
	$(document).on('submit', 'form', function(e) {
		e.preventDefault();
	});

	$(document).on('change', '.cep', function () {
		GetEndereco($(this).val(), $(this).closest('.row'));
	});

	$(".button-collapse").sideNav({
	    menuWidth: 300, // Default is 300
	    edge: 'right', // Choose the horizontal origin
	    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
	    draggable: true // Choose whether you can drag to open on touch screens,
	});

	window.onpopstate = function() {
		GoTo(location.pathname, false);
	};
	$(document).on('change', '.empresa-banco', function () {
		LoadBancos($(this).val(), 'banco-empresa');
	});
	$(document).on('change', '.modo-emprestimo', function () {
		if ($(this).val() == 3) {
			$('.empresa-emprestimo').attr('disabled', false);
			DesativeOnConta(3);
		} else if ($(this).val() == 4) {
			LoadProprietarios($('select[name="id_empresa"]').val(), 'empregado_funcionario');
			DesativeOnConta(4);
		} else if ($(this).val() == 5) {
			LoadFuncionarios($('select[name="id_empresa"]').val(), 'empregado_funcionario');
			DesativeOnConta(5);
		} else {
			DesativeOnConta(0);
		}
	});
	$(document).on('change', '.empresa-emprestimo', function (e) {
		if ($(this).val() == $('.empresa-banco').val()) {
			alert('A empresa que realizara o emprestimo não pode ser a mesma a recebe-lo');
			$(this).val('');
		} else {
			LoadBancos($(this).val(), 'banco-empresa-emprestimo');
		}
	});
	$(document).on('change', '.observe-post', function () {
		if ($(this).val() != '') {
			$('.error').remove();
			$(this).removeClass('observe-post');
		}
	});

	$(document).on('change', 'input[type="file"]', function () {
		if($(this).val() != '') {
			UploadFile($(this));
		}
	});


	// NOVAS
	$(document).on('click', 'a', function() {
		$('.active-a').removeClass('active-a');
		$(this).parent().addClass('active-a');
	});
	$(document).on('click', '.GiveLike', function() {
		var gostei = $(this).data('gostei');
		if (gostei >= 1) {
			$(this).removeClass('active');
			$(this).data('gostei', '0');
		} else {
			$(this).addClass('active');
			$(this).data('gostei', '1');
		}
		AddLike($(this).data('id'), $(this).data('id_usuario'), gostei);
	});
	$(document).on('click', '.remove', function() {
		var link = $(this).data('link');
		var id = $(this).data('id');
		var pai = $(this).closest('.parent');
		SubmitRemove(id, link, pai);
	});
	$(document).on('click', '#pesquisar_contato', function(e) {
		e.preventDefault();
		var form = $(this).closest('form');
		
		var post = form.serializeArray();
		var link = $(this).data('href');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SearchAjax(post, link, method, '#contatos');
		}
	});
	$(document).on('click', '#pesquisar_grupo', function(e) {
		e.preventDefault();
		var form = $(this).closest('form');
		
		var post = form.serializeArray();
		var link = $(this).data('href');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SearchAjax(post, link, method, '#grupos');
		}
	});
	$(document).on('click', '.add_contato', function(e) {
		e.preventDefault();

		var id_usuario = $(this).data('id_usuario');
		var id_usuario2 = $(this).data('id_usuario2');
		var post = {id_usuario: id_usuario, id_usuario2: id_usuario2};
		AdicionarContato(post);
	});
	$(document).on('change', 'select[name="tipo"]', function () {
		if ($(this).val() > 0) {
			MountToAdd($(this).val(), '#add-tipo');
		} else {
			$('#add-tipo').html('');
		}
	});
	$(document).on('click', '.define-tipo', function () {
		$('.define-tipo').removeClass('active');
		$(this).addClass('active');
		var tipo = $('select[name="tipo"]').val();
		var valor = $(this).data('val');
		if (tipo == 1) {
			$('input[name="id_grupo"]').val(valor);
		} else if (tipo == 2) {
			$('input[name="id_contato"]').val(valor);
		}
	});

});
// Eventos Após DOM
$(window).on('load', function (e) {
	removerLoader();
	FormatInputs();
});



// Funções
function UploadFile(isso) {
	var link = isso.data('href');
	var formData = new FormData();
	formData.append('arquivo', isso[0].files[0]);

	$.ajax({
	    url: link,
	    type: 'POST',
	    data: formData,
	    dataType: 'json',
	    processData: false,
	    contentType: false,
	    beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
	    },
	    success: function (data) {
	    	$('input[name="imagem"]').val(data);
	    },
	    error: function (xhr, e, t) {
	    	removerLoader();
	        console.debug((xhr.responseText));
	    },
	    complete: function() {
			removerLoader();
	    }
	});
}
function adicionarLoader() {
	$('body').css('overflow', 'hidden');
	$('.loader').fadeIn('fast');
}
function removerLoader() {
	$('body').css('overflow', 'auto');
	$('.loader').fadeOut('fast');
}
function InitBar() {
	if (localStorage.bar != 2 && localStorage.bar != 1) {
		localStorage.setItem("bar", 1);
	}
}
function GoTo(link, state, top) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
			$('#sair').fadeIn('slow');
		},
		success: function(data) {
			$('main').html(data);
		},
	    error: function(xhr) { // if error occured
	    	removerLoader();
	    	alert("Error, contate o administrador ou reinicie a pagina.");
	    },
	    complete: function() {
	    	if (typeof top == 'undefined') {
    			$('html,body').animate({ scrollTop: 0 }, 'slow');
	    	}
	    	removerLoader();
	    	$('.material-tooltip').remove();
	    	$('.tooltipped').tooltip({delay: 50});
	    	$('.modal').modal('close');
	    }
	});
	if (state == true) {
		window.history.pushState('Sistema Quorp', 'Sistema Quorp', link);
	}
}
function FormatInputs(focus) {
	$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Pronto',
    labelMonthNext: 'Próximo mês',
    labelMonthPrev: 'Mês anterior',
    labelMonthSelect: 'Selecione um mês',
    labelYearSelect: 'Selecione um ano',
    format: 'dd/mm/yyyy',
    closeOnSelect: false // Close upon selecting a date,
});
	$(document).ready(function(){
		$('.collapsible').collapsible();
	});
	$('.cnpj').mask('00.000.000/0000-00', {reverse: true});
	$('.cpf').mask('000.000.000-00', {reverse: true});
	$('.rg').mask('AAAAAAAAAAAAA', {reverse: true});
	$('.cep').mask('00000-000');
	$('.tel').mask('(00) Z0000-0000', {
		translation: {
			'Z': {
				pattern: /[0-9]/, optional: true
			}
		}
	});
	$('ul.tabs').tabs({
		responsiveThreshold : 'auto'
	});
  //usar pra esconder barra de baixo
  $('.money').mask('000000000000000,00', {reverse: true});
  $('.dropdown-button').dropdown();
  setTimeout(function(){ $('.carousel').carousel({dist: 0,padding: 15}); }, 500);
  // ActiveMaterializeInput(focus);
	// $('#'+'header_2').fadeOut('changeH2');
	// $('#'+'header_1').fadeIn('changeH2');
	// $('#'+'header_1').fadeOut('changeH1');
	// $('#'+'header_2').fadeIn('changeH1');
	// $('#'+'footer').fadeOut('hideFooter');
	// $('#'+'footer').fadeOut('showFooter');
	$('#'+'sobre-facul').click(function(){
		$('.facul-screen').toggle();
	})
}
function GetEndereco(cep, pai) {
	var link = 'https://viacep.com.br/ws/'+cep+'/json/ ';
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			
			if (data['erro'] == true) {
				alert('CEP não encontrado');
				$(pai).find('.uf').focus();
			} else {
				$(pai).find('.cidade').val(data['localidade']).focus();
				$(pai).find('.rua').val(data['logradouro']).focus();
				$(pai).find('.uf').val(data['uf']).focus();
				$(pai).find('.numero').focus();
			}
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    	alert("CEP não encontrado, utilize somente números");
    	$(pai).find('.uf').focus();
    },
    complete: function() {
    	removerLoader();
    }
});
}
function SubmitAjax(post, link, back, method) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			if (typeof data != undefined && data > 0) {
				Materialize.toast('<div class="center-align" style="width:100%;">Cadastrado com sucesso</div>', 5000, 'rounded');
			}
			if (typeof back != 'undefined' && back != '') {
				GoTo(back, true);
			}
		},
	    error: function(xhr) { // if error occured
	    	removerLoader();
	    	alert("Error, contate o administrador ou reinicie a pagina.");
	    },
	    complete: function() {
	    	removerLoader();
	    	$('.modal').modal('close');
	    }
	});
}
function SendAjax(post, link, back, method) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			var texto = $('#chat_enviar input[name="texto"]')
			var mensagem = texto.val();
			$('#chat > .container').append('<div class="message-wrapper me"> <div class="text-wrapper animated fadeIn">'+mensagem+'</div></div>');
			texto.val('');
		},
	    error: function(xhr) { // if error occured
	    	removerLoader();
	    	alert("Error, contate o administrador ou reinicie a pagina.");
	    },
	    complete: function() {
	    	removerLoader();
	    	$('.modal').modal('close');

			$('html,body').animate({ scrollTop: $('html').height() }, 'slow');
	    }
	});
}
function SearchAjax(post, link, method, to) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$(to).html(data);
		},
	    error: function(xhr) { // if error occured
	    	removerLoader();
	    	alert("Error, contate o administrador ou reinicie a pagina.");
	    },
	    complete: function() {
	    	$('html,body').animate({ scrollTop: 0 }, 'slow');
	    	removerLoader();
	    	$('.material-tooltip').remove();
	    	$('.tooltipped').tooltip({delay: 50});
	    	$('.modal').modal('close');
	    }
	});
}
function Reestruturar(str) {
	var i = 1;
	$('.'+ str +' > div').each(function () {
		$(this).data('num', ''+i+'');
		i += 1;
	});
	return i;
}
// function ActiveMaterializeInput(focus) {
// 	if (focus != undefined && focus != 'undefined') {
// 		
// 		focus.first().focus();
// 		return true;
// 	}
// 	$('main textarea:not(disabled)').each(function () {
// 		if ($(this).val() != '') {
// 			$(this).focus();
// 		}
// 	});
// 	$('main input:not(disabled)').each(function () {
// 		if ($(this).val() != '') {
// 			$(this).focus();
// 			$('main input:not([disabled]):not([type="hidden"])').first().focus();
// 		}
// 	});
// }
function MountModal(modal, link) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema'+link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$(modal).find('.modal-content').html(data);
			$(modal).modal('open');

			
		},
	    error: function(xhr) { // if error occured
	    	removerLoader();
	    	alert("Error, contate o administrador ou reinicie a pagina.");
	    },
	    complete: function() {
	    	removerLoader();
	    	$('.material-tooltip').remove();
	    	$('.tooltipped').tooltip({delay: 50});
	    	FormatInputs();
	    }
	});
}
function VerificarForm() {
	var error = false;
	$('.error').remove();
	$('input:enabled:not([type="hidden"])[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			error = true;
			return false;
		};
	});
	$('textarea:enabled[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			error = true;
			return false;
		};
	});
	$('select:enabled[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			error = true;
			return false;
		};
	});
	if (error == false) {
		return true;
	}
}
function VerificaItem(isso) {
	if (isso.val() == '') {
		AddError(isso);
		return true;
	}
}
function AddError(isso) {
	
	isso.focus().addClass('observe-post').parent().append('<div class="error">Complete corretamente</div>');
}
function DesativeOnConta(modo) {
	if (modo == 3) {
		$('.empregado_funcionario').attr('disabled', true).val('');
	} else if (modo == 4) {
		$('.empresa-emprestimo').attr('disabled', true).val('');
		$('.banco-empresa-emprestimo').attr('disabled', true).val('');
	} else if (modo == 5) {
		$('.empresa-emprestimo').attr('disabled', true).val('');
		$('.banco-empresa-emprestimo').attr('disabled', true).val('');
	} else {
		$('.empregado_funcionario').attr('disabled', true).val('');
		$('.empresa-emprestimo').attr('disabled', true).val('');
		$('.banco-empresa-emprestimo').attr('disabled', true).val('');
	}
}

// NEW
function AddLike(id, id_usuario, gostei) {
	var post = {id_postagem: id, id_usuario: id_usuario};
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: '/sistema/postagens/gostei/',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			if (gostei >= 1) {
				Materialize.toast('Publicação Descurtida!', 3000);
			} else {
				Materialize.toast('Publicação Curtida!', 3000);
			}
		},
	    error: function(xhr) { // if error occured
	    	removerLoader();
	    	alert("Error, contate o administrador ou reinicie a pagina.");
	    },
	    complete: function() {
	    	removerLoader();
	    }
	});
}
function SubmitRemove(id, link, pai) {
	var post = {id: id, deletado: 1};
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			pai.remove();
		},
	    error: function(xhr) { // if error occured
	    	removerLoader();
	    	alert("Error, contate o administrador ou reinicie a pagina.");
	    },
	    complete: function() {
	    	removerLoader();
	    }
	});
}
function AdicionarContato(post) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: '/sistema/usuarios/contatos/adicionar',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			if(data.length != 0) {
				GoTo(location.pathname, false);
			}
		},
	    error: function(xhr) { // if error occured
	    	removerLoader();
	    	alert("Error, contate o administrador ou reinicie a pagina.");
	    },
	    complete: function() {
	    	removerLoader();
	    }
	});
}
function MountToAdd(val, where) {
	$.ajax({
		method: 'POST',
		async: true,
		data: {tipo: val},
		url: '/sistema/postagens/tipo/',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$(where).html(data);
		},
	    error: function(xhr) { // if error occured
	    	removerLoader();
	    	alert("Error, contate o administrador ou reinicie a pagina.");
	    },
	    complete: function() {
	    	removerLoader();
	    }
	});
}