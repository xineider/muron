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

	$(document).on('click', '.ajax-load', function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		console.log(link);
		GoTo(link, true);
	});

	$(document).on('click', '.ajax-submit', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back, method);
		}
	});

                // var form = $(this).parents('form')[0];
                // var formData = new FormData(form);
                // // Main magic with files here
                // // formData.append('image', $('#foto_perfil')[0].files[0]); 
                // $.ajax({
                //     url: link,
                //     data: formData,
                //     type: 'POST',
                //     async: false,
                //     // THIS MUST BE DONE FOR FILE UPLOADING
                //     contentType: false,
                //     processData: false,
                //     dataType: "multipart/form-data",
                //     success: function (data) {
                //         console.debug(data);

                //     }, error: function (xhr, e, t) {
                //         console.debug((xhr.responseText));
                //     }
                // });
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
});
// Eventos Após DOM
$(window).on('load', function (e) {
	removerLoader();
	FormatInputs();
});



// Funções
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
function GoTo(link, state) {
	$.ajax({
	  method: "GET",
	  async: true,
	  url: link,
    beforeSend: function() {
			adicionarLoader();
    },
    success: function(data) {
  		$('main').html(data);
    },
    error: function(xhr) { // if error occured
      alert("Error, contate o administrador ou reinicie a pagina.");
    },
    complete: function() {
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
  ActiveMaterializeInput(focus);
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
    beforeSend: function() {
			adicionarLoader();
    },
    success: function(data) {
    	console.log(data);
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
    beforeSend: function() {
			adicionarLoader();
    },
    success: function(data) {
    	console.log(data);
    	if (typeof data != undefined && data > 0) {
  			Materialize.toast('<div class="center-align" style="width:100%;">Cadastrado com sucesso</div>', 5000, 'rounded');
    	}
			GoTo(back, true);
    },
    error: function(xhr) { // if error occured
      alert("Error, contate o administrador ou reinicie a pagina.");
    },
    complete: function() {
			removerLoader();
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
function ActiveMaterializeInput(focus) {
	if (focus != undefined && focus != 'undefined') {
	console.log(focus);
		focus.first().focus();
		return true;
	}
	$('main textarea:not(disabled)').each(function () {
		if ($(this).val() != '') {
			$(this).focus();
		}
	});
	$('main input:not(disabled)').each(function () {
		if ($(this).val() != '') {
			$(this).focus();
			$('main input:not([disabled]):not([type="hidden"])').first().focus();
		}
	});
}
function MountModal(modal, link) {
	$.ajax({
	  method: "GET",
	  async: true,
	  url: '/sistema'+link,
    beforeSend: function() {
			adicionarLoader();
    },
    success: function(data) {
			$(modal).find('.modal-content').html(data);
			$(modal).modal('open');
    },
    error: function(xhr) { // if error occured
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
	console.log(isso);
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