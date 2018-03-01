$(document).ready(function(){
	
	prepare();
	$('.js_hide_show_info_key>p').on('click', function(event){
		event.stopPropagation();
		show_hide($(this).parent('div'));
	});
	function show_hide(dom){
		var add_show_status=dom.data("showstatus");
		if(add_show_status=="closed"){
			dom.children('.js_additional_info').removeClass('js_additional_info_hiden');
			dom.data("showstatus", "open");
		} else if(add_show_status=="open"){
			dom.children('.js_additional_info').addClass('js_additional_info_hiden');
			dom.data("showstatus", "closed");
		}
	}
	function prepare(){
		$('.js_hide_show_info_key').data('showstatus', 'closed');
		$('.js_additional_info').addClass('js_additional_info_hiden');
	}
});