// Eventos DOM
$(document).on('ready', function () {
	M.AutoInit();
	var modalW = document.querySelector('.modal');
	var modalinstance = M.Modal.init(modalW);
	var modalParaAbrir;
	var modalAbrirInstance;

	$('.modal').modal();
	InitBar();
	adicionarLoader();
	FormatInputs();
	GoTo(location.pathname, false);

	// adicionarPaddingMain();

	/*só para dar update no umbler*/

	$(document).ajaxComplete(function () {
		FormatInputs();
		M.updateTextFields();
	});

	$(document).on('click', '.modal-remover-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var texto = $(this).data('texto');
		var id = $(this).data('id');
		var to = $(this).data('to');
		var back = $(this).data('back');

		var modalremover = document.querySelector('#modaldeletar');
		var modalremoverInstance = M.Modal.init(modalremover);
		modalremoverInstance.open();

		$(modal).find('#texto').text(texto);
		$(modal).find('#id').val(id);
		$(modal).find('button').data('href', to).data('action', back);
	});

	$(document).on('click', '.modal-validate-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var texto = $(this).data('texto');
		var id = $(this).data('id');
		var to = $(this).data('to');
		var back = $(this).data('back');

		var modalvalidate = document.querySelector('#modalvalidar');
		var modalvalidateInstance = M.Modal.init(modalvalidate);
		modalvalidateInstance.open();

		$(modal).find('#texto').text(texto);
		$(modal).find('#id').val(id);
		$(modal).find('button').data('href', to).data('action', back);
	});


	$(document).on('click', '.modal-one-item-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var texto = $(this).data('texto');
		var textoBotao = $(this).data('texto-botao');
		var corBotao = $(this).data('cor-botao');
		var id = $(this).data('id');
		var to = $(this).data('to');
		var back = $(this).data('back');

		var modaloneitem = document.querySelector('#modaloneitem');
		var modaloneitemInstance = M.Modal.init(modaloneitem);
		modaloneitemInstance.open();

		$(modal).find('#texto').text(texto);
		$(modal).find("#texto_botao").text(textoBotao);
		$(modal).find("#texto_botao").addClass(corBotao);

		$(modal).find('#id').val(id);
		$(modal).find('button').data('href', to).data('action', back);
	});





	$(document).on('click', '.modal-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var link = $(this).data('link');
		MountModal(modal, link);
	});
	$(document).on('click', '.modal-mount-inteiro', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var link = $(this).data('link');
		MountModalInteiro(modal, link);
	});


	$(document).on('click', '.modal-input', function (e) {
		e.preventDefault();
		$('#modalinput label').text($(this).data('nome'));
		$('#modalinput input:not(#id)').prop('name', $(this).data('collum')).val('');
		$('#modalinput #id').val($(this).data('id'));
		
		var modalinput = document.querySelector('#modalinput');
		var modalinputInstance = M.Modal.init(modalinput);
		modalinputInstance.open();
	});

	$(document).on('click', '.modal-include-html', function (e) {
		e.preventDefault();
		$('#modalinput label').text($(this).data('nome'));
		$('#modalinput input:not(#id)').prop('name', $(this).data('collum')).val('');
		$('#modalinput #id').val($(this).data('id'));
		var modalinclude = document.querySelector('#modalinput');
		var modalincludeInstance = M.Modal.init(modalinclude);
		modalincludeInstance.open();
	});

	$(document).on('click', '.ajax-load', function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		var top = $(this).data('top');

		if(link != ''){
			var navAjaxE = document.querySelector('.sidenav');
			var navAjaxI = M.Sidenav.getInstance(navAjaxE);
			if(navAjaxI != undefined){
				navAjaxI.close();
			}		
			GoTo(link, true, top);
		}
	});

	$(document).on('click', '.ajax-load-back', function(e) {
		e.preventDefault();

		var link = $(this).attr('href');
		var top = $(this).data('top');

		if(link!=""){
			var navAjaxbE = document.querySelector('.sidenav');
			var navAjaxbI = M.Sidenav.getInstance(navAjaxbE);
			if(navAjaxbI != undefined){
				navAjaxbI.close();
			}
			GoToBackToIndex(link, true, top);
		}
	});

	$(document).on('click', '.ajax-load-to', function(e) {
		e.preventDefault();
		var link = $(this).data('href');
		var to = $(this).data('load-to');
		LoadToClass(link, to);
	});

	$(document).on('click', '.remove', function (e) {
		e.preventDefault();
		$(this).closest('.pai').remove();
	});
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
	$(document).on('click', '.ajax-search-post', function(e) {
		e.preventDefault();
		var pesquisa = $(this).parent().prev().find('input[name="pesquisa"]').val();
		// var pesquisa = $('input[name="pesquisa"]').val();
		if (pesquisa.indexOf('/') !== -1) {
			pesquisa = pesquisa.split('/').join('_');
		}
		GoTo($(this).data('href')+pesquisa, true);
	});
	$(document).on('submit', 'form', function(e) {
		e.preventDefault();
	});

	$(document).on('change', '.cep', function () {
		GetEndereco($(this).val(), $(this).closest('.row'));
	});

	$(document).on('change', 'select[name="id_filtro"]', function () {
		var father = $(this).parent().attr('class')

		//1 - faculdade, 2 - UF, 3 - cidade
		if($(this).val() == 1){
			LoadToClass('/sistema/postagens/adicionar/filtro/faculdades',father);
		}


	});


	$(document).on('click','.checkbox_selecionar_usuario',function(){
		var itenscheckados = 0;
		if($(this).prop('checked') == true){
			$('.footer_adicionar_contatos ').css('display','block');
			$('.footer_adicionar_contatos ').css('opacity',1);
			itenscheckados++;
		}

		$('#contatos').find('.checkbox_selecionar_usuario').each(function(){
			if($(this).prop('checked') == true){
				itenscheckados++;
			}
		});

		if(itenscheckados == 0){
			$('.footer_adicionar_contatos ').css('display','none');
			$('.footer_adicionar_contatos ').css('opacity',0);
		}

	});
	var primeiravezcheckbox = 0;
	var itenscheckados = 0;
	var alunodeletado = 0;
	var alunoativo = 0;

	$(document).on('click','.checkbox_selecionar_aluno',function(){
		/*aluno ativo e está selecionando para remover*/

		if(primeiravezcheckbox == 0){

			if($(this).data('aluno_deletado') == 0 && $(this).prop('checked') == false ){
				$('.footer_remover_aluno ').css('display','block');
				$('.footer_remover_aluno ').css('opacity',1);
				primeiravezcheckbox = 1;
				itenscheckados++;
				alunoativo = 1;
			}else if ($(this).data('aluno_deletado') == 1 && $(this).prop('checked') == true){
				$('.footer_adicionar_aluno').css('display','block');
				$('.footer_adicionar_aluno').css('opacity',1);
				primeiravezcheckbox = 1;
				itenscheckados++;
				alunodeletado = 1;
			}

		}else{
			/*se foi selecionado um aluno ativo ele deve permanecer sempre com aquele*/
			if(alunoativo == 1){
				/*se selecionar outro aluno ele incrementa*/
				if($(this).data('aluno_deletado') == 0 && $(this).prop('checked') == false){
					itenscheckados++;
					/*se ele deselecionar um aluno ele descrementa*/
				}else if($(this).data('aluno_deletado') == 0 && $(this).prop('checked') == true){
					itenscheckados--;
				}
				/*se selecionar um aluno deletado enquanto estiver selecionando um aluno ativo ele volta o checked*/
				if($(this).data('aluno_deletado') == 1){
					$(this).prop('checked',false);
				}
				/*se foi selecionado um aluno deletado ele deve permanecer sempre com aquele*/
			}else if(alunodeletado == 1){
				if($(this).data('aluno_deletado') == 1 && $(this).prop('checked') == true){
					itenscheckados++;
				}else if($(this).data('aluno_deletado') == 1 && $(this).prop('checked') == false){
					itenscheckados--;
				}
				if($(this).data('aluno_deletado') == 0){
					$(this).prop('checked',true);
				}
			}
		}

		/*Se não tiver item checkado remover tudo e limpar os valores*/

		if(itenscheckados == 0){
			primeiravezcheckbox = 0;
			alunoativo = 0;
			alunodeletado = 0;
			$('.footer_remover_aluno ').css('display','none');
			$('.footer_remover_aluno ').css('opacity',0);
			$('.footer_adicionar_aluno').css('display','none');
			$('.footer_adicionar_aluno').css('opacity',0);
		}

	});

	$(".sidenav-trigger").sidenav();

	window.onpopstate = function() {
		GoTo(location.pathname, false);
	};


	$(document).on('change', '.observe-post', function () {
		if ($(this).val() != '') {
			$('.error').remove();
			$(this).removeClass('observe-post');
		}
	});

	$(document).on('change', 'input[type="file"]:not(#imagem_perfil)', function () {
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
		/*limpar contatos_alunos*/
		primeiravezcheckbox = 0;
		itenscheckados = 0;
		alunodeletado = 0;
		alunoativo = 0;


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

	$(document).on('click', '.sidenav-trigger', function(e) {
		var navbarE = document.querySelector('.sidenav');
		var navbarI = M.Sidenav.init(navbarE,{edge:'right'});
		navbarI.open();
	});


	$(document).on('click', '.fixed-action-btn', function(e) {

		var fixedE = document.querySelectorAll('.fixed-action-btn');
		var fixedI = M.FloatingActionButton.init(fixedE,{hoverEnabled:false});
	});

	$(document).on('click', '.alterar-senha-botao', function(e) {
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
		$('input[name="senha_atual"').val('');
		$('#alterar_senha').val('');
		$('#confirmar_alterar_senha').val('');
		$('.erro-alterar-senha').hide();

	});


	$(document).on('click', '.rotate-esquerda', function () {
		console.log('estou virando para a esquerda');
		var cropper = $(this).data('cropper');
		$(cropper).cropper("rotate",90)
	});

	$(document).on('click', '.rotate-direita', function () {
		console.log('estou virando para a direita');
		var cropper = $(this).data('cropper');
		$(cropper).cropper("rotate",-90)
	});

	$(document).on('click', '.zoom-plus', function () {
		console.log('estou dando zoom');
		var cropper = $(this).data('cropper');
		$(cropper).cropper("zoom",0.1);
	});

	$(document).on('click', '.zoom-minus', function () {
		console.log('estou removendo o zoom');
		var cropper = $(this).data('cropper');
		$(cropper).cropper("zoom",-0.1)
	});


	$(document).on('click', '.ajax-submit-crop', function(e) {
		e.preventDefault();
		var form = $(this).closest('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';

		var cropper = $('#imagem-publicacao-post').data('cropper');
		console.log('croppper');
		console.log(cropper);

		cropper.getCroppedCanvas().toBlob((blob) => {
			var formData = new FormData();
			formData.append('arquivo', blob);

			$.ajax({
				url: '/sistema/postagens/editar_imagem_postagem/',
				type: 'POST',
				data: formData,
				dataType: 'json',
				processData: false,
				contentType: false,
				beforeSend: function(request) {
					request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
					adicionarLoader();
				},
				success: function (nome_arquivo) {
					/*coloco dentro do post o nome da imagem e o arquivo que foram movidos para lá*/
					post.push({name:'imagem',value:nome_arquivo});
					if (VerificarForm(form) == true) {
						SubmitAjax(post, link, back, method);
					}

				},
				error: function(xhr) { 
					removerLoader();
					console.log('deu erro');
					alert("Error, contate o administrador ou reinicie a pagina.");
				},
				complete: function() {
					removerLoader();
					console.log('estou no complete')
					$('.modal').modal('close');
				}
			});
		});

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
	$(document).on('change', '#imagem_perfil', function() {
		UploadFilePerfil($(this));
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
	console.log('FILE UPLOAD');
	console.log(isso[0].files[0]);
	var formData = new FormData();
	formData.append('arquivo', isso[0].files[0]);

	$.ajax({
		method: 'POST',
		async: true,
		data: formData,
		url: link,
		processData: false,
		contentType: false,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function (data) {
			console.log('SUCESSO');
			$('.imagem-upload-preview').append(data);
		},
		error: function (xhr, e, t) {
			console.debug((xhr.responseText));
			removerLoader();
		},
		complete: function() {
			removerLoader();
		}
	});
}

function UploadFilePerfil(isso) {
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
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
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
			var form = isso.closest('form');
			
			var post = form.serializeArray();
			var link = form.data('href');
			var back = form.data('action');
			var metodo = isso.data('method');
			var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
			if (VerificarForm(form) == true) {
				SubmitAjax(post, link, back, method);
			}
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
	var elem = document.querySelector('.sidenav');
	var instance = M.Sidenav.init(elem);
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
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
	    	$(".sidenav-trigger").sidenav('close');
	    	$(".sidenav").sidenav('close');
	    	instance.close();
	    }
	});
	if (state == true) {
		window.history.pushState('Muron', 'Muron', link);
	}
}

function GoToBackToIndex(link, state, top) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			adicionarLoader();
			$('#sair').fadeIn('slow');
		},
		success: function(data) {
			$('body').addClass('login');
			$('body').removeClass('g-white');
			$('body').html(data);
			
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
	  }
	});
	if (state == true) {
		window.history.pushState('Muron', 'Muron', link);
	}
}








function FormatInputs(focus) {
	$('.datepicker').datepicker({
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
	});

	var imagem_publicacao_post = $('#imagem-publicacao-post');

	if(typeof imagem_publicacao_post != undefined){

		console.log('iiiiiiiiiiiiiiiiii imagem_publicacao_post iiiiiiiiiiiiiiiii');
		console.log(imagem_publicacao_post);
		console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');

		$(imagem_publicacao_post).cropper({
			viewMode:2
		});
	}
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
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
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
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD AJAX DATA DDDDDDDDDDDDDDDDDDDDDD');
			console.log(data);
			console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
			if (typeof data != undefined && data != 'alterado_senha') {
				M.toast({html:'<div class="center-align" style="width:100%;">Cadastrado com sucesso</div>'}, 5000, 'rounded');
			}
			if(data == 'alterado_senha'){
				M.toast({html:'<div class="center-align" style="width:100%;">Senha Alterada com sucesso!</div>'}, 5000, 'rounded');
			}
			if (typeof back != 'undefined' && back != '') {
				GoTo(back, true);
			}
			if (data == 'errorsenha') {
				$('form').prepend('<div class="card-panel red darken-1 center-align erro-alterar-senha" style="margin-bottom: 25px;"> <span class="white-text">Senha atual incorreta, tente novamente.</span> </div>');
			}
			if(data == 'usuariojacadastrado'){
				M.toast({html:'<div class="center-align" style="width:100%;">Nome Murer Já cadastrado !!</div>'},8000, 'rounded');
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
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
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
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
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
function MountModalInteiro(modal, link) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema'+link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			var modalelement = document.querySelector(modal);
			var modalInstance = M.Modal.init(modalelement);
			$(modal).html(data);
			modalInstance.open();
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


function MountModal(modal, link) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema'+link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima_faculdade", $('input[name="id_faculdade_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			var modalelement = document.querySelector(modal);
			var modalInstance = M.Modal.init(modalelement);
			$(modal).find('.modal-content').html(data);
			modalInstance.open();
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
function VerificarForm(form) {
	var error = false;
	$('.error').remove();
	form.find('input:enabled:not([type="hidden"])[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			error = true;
			return false;
		};

		if($('#alterar_senha').val() != $('#confirmar_alterar_senha').val())
		{
			AddError($('#confirmar_alterar_senha'),'Senhas são diferentes');
			error = true;
			return false;
		}
	});
	form.find('textarea:enabled[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			error = true;
			return false;
		};
	});
	form.find('select:enabled[required="true"]').each(function(){
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
	//Adicionei o isso.val() == null para fazer funcionar no select já que =='' não pega select
	if (isso.val() == '' || isso.val() == null) {
		AddError(isso);
		return true;
	}
}

function AddError(isso) {	
	isso.focus().addClass('observe-post').parent().append('<div class="error">Complete corretamente</div>');
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
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			if (gostei >= 1) {
				M.toast({html:'Publicação Descurtida!'}, 3000);
			} else {
				M.toast({html:'Publicação Curtida!'}, 3000);
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
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
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

function LoadToClass(link, to) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-tipo", $('input[name="tipo_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('.'+to).append(data);
		},
		error: function(xhr) {
			removerLoader();
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
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
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
			request.setRequestHeader("Authority-Optima-faculdade", $('input[name="id_faculdade_sessao"]').val());
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