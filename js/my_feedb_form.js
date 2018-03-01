$(document).ready(function(){
	var type;
	var $form;
	var post_theme="";
	var feedb_theme_check=0;
	var page_url;
	var error_count=0;
	var fields_n;
	var checkbox_n;
	var radio_n;
	var fields_requare_lib=[];
	var fields_val_lib=[];
	var fields_title_lib=[];
	var element_count=1;
	// var radio_check=0;
	var message_template="";
	var default_value="";
	var files_check;
	var php_url="/wp-content/themes/my_custom/js/";

	// кусок для файлов
	// Глобальная переменная куда будут располагаться данные файлов. С не будем работать
	var first_time_files=true;
	var files;
	var domain_name="";
	//пример заполнения: /home/a/adronrom20/public_html
	var full_domain_name="";
	//пример заполнения: http://smirnov2018.ru/
	var my_path='';
	var fix_path;
	// var files_lib_prew=[];//нужно что бы собрать файлы с нескольких полей для ввода изображения
	// var files_fields_n;//счетчик полей с файлами
	var files_lib_count=0;
	var files_lib=[];
	var i=0;
	// конец куска для файлов


	function get_files(){
	// Получим данные файлов и добавим их в переменную
		$('input[type=file]').change(function(){
			files=[];
			$('input[type=file]').each(function() {
				var files_temp = this.files;
				if(first_time_files==true){
					files=this.files;
					first_time_files=false;
				} else{
					files = $.merge( $.merge( [], files ), files_temp );
				}
			});
		});
	}
	get_files();
	// Вешаем функцию на событие

	function upload_file(){
		// на 2 строки ниже ругается FF. впрочем работает и без них
		event.stopPropagation(); // Остановка происходящего
		event.preventDefault();  // Полная остановка происходящего

		// Содадим данные формы и добавим в них данные файлов из files
		var data = new FormData();
		$.each( files, function( key, value ){
			data.append( key, value );
		});

		

		// Отправляем запрос
		$.ajax({
			url: php_url+'submit.php?uploadfiles',
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Не обрабатываем файлы (Don't process the files)
			contentType: false, // Так jQuery скажет серверу что это строковой запрос
			success: function( respond, textStatus, jqXHR ){
				// Если все ОК
				if( typeof respond.error === 'undefined' ){
					// Файлы успешно загружены, делаем что нибудь здесь
					var files_path = respond.files;
					console.log("Файл загружен по адресу: "+files_path);
					$.each( files_path, function( key, val ){ 
						function clear_path(val){
							var fix_path_pos;
							fix_path_pos=val.indexOf(domain_name);
							fix_path_pos=fix_path_pos+(domain_name.length);
							fix_path = val.substring(fix_path_pos);
						}
						clear_path(val);
						files_lib[files_lib_count]=fix_path;
						files_lib_count++;
					} );

				}
				else{
					console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
				}
				ajax_send();
			},
			error: function( jqXHR, textStatus, errorThrown ){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus );
			}
		});
	}
//************************************конец куска с файлами
$('input, select, textarea').bind("change", function(){
	$(this).removeClass('error_field');
	$(this).parent("div").removeClass('error_field');
});


$('.js_input').bind('change', function(){
	$(this).removeClass('error_field');
});
$('.js_input:radio').bind('change', function(){
	$(this).closest('.js_radio_group').find('input').removeClass('error_field');
});
$('.js_input:checkbox').bind('change', function(){
	$(this).closest('.js_checkbox_group').find('input').removeClass('error_field');
});
$('.js_open_feedb_key').on('click', function(){
	type=$(this).data("name");	
	default_value=$(this).data('default');
	if((default_value=="undefined ")||(default_value=="")||(default_value==null)||(default_value=="undefined")){
		default_value="";
	}
	$('.feedb_shadow').fadeIn(300);
	$('.js_feedb_form_'+type).css({"display":"table"});
	$('.js_feedb_default').val(default_value);
});
$('.feedb_shadow, .js_feedb_close_key').on('click', function(){
	$('.feedb_family').fadeOut(300);
	$('.js_feedb_form_'+type).find('.js_input').val('');
});


$('.js_feedb_send_key').on('click', function(){
	$form=$(this).closest('.js_feedb_form');
	message_template="";
	element_count=1;
	radio_check=0;
	error_count=0;
	var agree_fields_n=$form.find('.js_agree_field').length;
	var agree_check=false;
	var check_requare;
	post_theme=$form.data("posttheme");
	files_check=$form.data("files");
	if(post_theme==""){
		page_url=document.location.href;
		post_theme="Сообщение со страницы "+page_url;
	}
		
		fields_n=$form.find(".js_input").length;
		radio_n=$form.find(".js_input:radio").length;
		checkbox_n=$form.find(".js_input:checkbox").length;
		fields_n=fields_n-radio_n-checkbox_n;
		$form.find(".js_input").each(function() {
			//Собираем данные с радио кнопок (если они есть)
			if(($(this).attr('type')!='radio')&&($(this).attr('type')!='checkbox')){
				fields_title_lib[element_count]=$(this).data('fieldtitle');
				fields_val_lib[element_count]=$(this).val();
				check_requare=$(this).data('requare');
				if((fields_val_lib[element_count]=="empty")||(fields_val_lib[element_count]=="undefined")||(fields_val_lib[element_count]=="")&&(check_requare==true)){
					$(this).addClass('error_field');
					error_count++;
				}

				element_count++;
			}
		});

		var check_radio=$form.find('.js_radio_group').length;
		fields_n=fields_n+check_radio;
		if(check_radio>0){
			$form.find('.js_radio_group').each(function() {
				var temp_checked=$(this).find("input:radio:checked").length;
				if(temp_checked==1){
					fields_title_lib[element_count]=$(this).data('fieldtitle');
					fields_val_lib[element_count]=$(this).find("input:radio:checked").val();
				} else if((temp_checked==0)&&($(this).data('requare')==true)){
					$(this).find('.js_input').addClass('error_field');
					error_count++;
				} else if((temp_checked==0)&&($(this).data('requare')!=true)){
					fields_title_lib[element_count]=$(this).data('fieldtitle');
					fields_val_lib[element_count]="-";
				}
				element_count++;
			});
		}


		var check_checkbox=$form.find('.js_checkbox_group').length;
		fields_n=fields_n+check_checkbox;
		if(check_checkbox>0){
			$form.find('.js_checkbox_group').each(function() {
				var temp_checkbox_build="";
				var temp_checked=$(this).find("input:checkbox:checked").length;
				if(temp_checked>0){
					fields_title_lib[element_count]=$(this).data('fieldtitle');
					$(this).find("input:checkbox:checked").each(function() {
						temp_checkbox_build=temp_checkbox_build+$(this).val()+"; ";
						fields_val_lib[element_count]=temp_checkbox_build;
					});
				} else if((temp_checked==0)&&($(this).data('requare')==true)){
					$(this).find('.js_input').addClass('error_field');
					error_count++;
				} else if((temp_checked==0)&&($(this).data('requare')!=true)){
					fields_title_lib[element_count]=$(this).data('fieldtitle');
					fields_val_lib[element_count]="-";
				}
				element_count++;
			});
		}

		
		if(error_count==0){
			if(agree_fields_n==0){
				alert("Сообщение отправляется, это может занять некоторое время");
				build_message();
				if(files_check==true){
					upload_file();
				} else{
					files_lib="";
					ajax_send();
					// show_me_message_in_console();
				}
			} else{
				agree_check=$form.find('.js_agree_field').prop('checked');
				if (agree_check==true){
					alert("Сообщение отправляется, это может занять некоторое время");
					build_message();
					if(files_check==true){
						upload_file();
					} else{
						files_lib="";
						ajax_send();
						// show_me_message_in_console();
					}
				} else{
					$form.find('.js_agree_field').addClass('error_field');
					alert("Нужно принять условия политики конфиденциальности!");
				}
			}

		} else{
			alert("Проверьте правильность заполнения полей");
		}

});//end send_feedb_click
function show_me_message_in_console(){
	console.log('message_template = '+message_template);
	console.log('post_theme = '+post_theme);
	console.log('domain_name = '+domain_name);
	console.log('full_domain_name = '+full_domain_name);
}


		function ajax_send(){
			$.ajax({
				url: php_url+'smtp_send.php',
				type: 'POST',
				data: {
					message_template:message_template,
					post_theme: post_theme,
					domain_name: domain_name,
					full_domain_name: full_domain_name,
					files_lib: files_lib
				},
				success: function(data){
					alert(data);
					console.log('ответ от сервера: '+data);
					$('.js_input:text').val('');
					$('textarea.js_input').val('');
					$('.js_input:checkbox').prop('checked', false);
					$('.js_input:radio').prop('checked', false);
					$form.find('.js_feedb_close_key').click();
				}
			})
			.done(function() {
				console.log("success");
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}
		function build_message(){
			for(var i=1;i<=fields_n;i++){
				message_template=message_template+"<b>"+fields_title_lib[i]+"</b> "+fields_val_lib[i]+"<br> <hr>";
			}
		}
});