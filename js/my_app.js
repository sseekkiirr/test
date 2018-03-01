$(document).ready(function(){
	$('.hidden_menu_element').parent("li").css({"display":"none"});
	$('.js_no_child').parent("li").children('ul').remove();
	$('.js_cell_helper').find('img').attr({
		"width": '',
		"height": ''
	});
	window.onload = function(){ 
	    clean_H_items();
	    fix_H_items();
	    unknown_H();
	    js_props_check();
	};

     $(window).on('resize', function(){
         clean_H_items();
         fix_H_items();
         unknown_H();
         js_props_check();
     });


 	function js_props_check(){
 		$('.js_props').each(function() {
 			var temp_prop=$(this).data('x');

 			if(temp_prop){
 				js_props_make($(this), temp_prop);
 			}
 		});
 	}
 	function js_props_make(dom, temp_prop){
 		var temp_W=dom.css("width");
 		temp_W=parseFloat(temp_W);
 		var temp_H=temp_W/temp_prop;
 		temp_H=parseInt(temp_H);
 		dom.css({"height":temp_H+"px"});
 	}

	// $(".datepicker").datepicker();
	// $.datepicker.regional['ru'] = { 
	// closeText: 'Закрыть', 
	// prevText: '&#x3c;Пред', 
	// nextText: 'След&#x3e;', 
	// currentText: 'Сегодня', 
	// monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь', 
	// 'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'], 
	// monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн', 
	// 'Июл','Авг','Сен','Окт','Ноя','Дек'], 
	// dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'], 
	// dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'], 
	// dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], 
	// dateFormat: 'dd.mm.yy', 
	// firstDay: 1, 
	// isRTL: false 
	// }; 
	// $.datepicker.setDefaults($.datepicker.regional['ru']); 
	//Описания к фоткам
	$('.js_galery_with_alt').children('.js_galery_container').each(function() {
		$(this).children('.js_mini_photo').each(function() {
			var img_descr=$(this).children('img').attr('alt');
			$(this).append("<div class='row description'><p>"+img_descr+"</p></div>");
		});
	});
	function unknown_H(){
		$('.js_unknown_H').each(function(index, el) {
			$(this).attr('style', '');
			// var el_H=$(this).height();
			var el_H=$(this).css("height");
			el_H=parseInt(el_H);
			console.log("el_H = "+el_H);
			var padding_top=$(this).css("padding-top");
			padding_top=parseInt(padding_top);
			var padding_bottom=$(this).css("padding-bottom");
			padding_bottom=parseInt(padding_bottom);
			el_H=el_H+padding_top+padding_bottom;
			$(this).css({"height":el_H+"px"});
		});	
	}
    function fix_H(dom, padding){
         var max_H=0;
         dom.each(function(index, el) {
             var current_H=$(this).height();
             if(current_H>max_H){
                 max_H=current_H;
             }
         });
         dom.each(function(index, el){
             $(this).css({height:max_H+padding+"px"});
         });
     }
     function clean_H(dom){
         dom.css({height:""});
     }



     function fix_H_items(){
         fix_H($('.js_fix_H .item'), 0);
         fix_H($('.main_page_products .title'), 0);
     }
     function clean_H_items(){
         clean_H($('.js_fix_H .item'));
         clean_H($('.main_page_products .title'));
         
     }


	// *************************плавная прокрутка
	    $("a.scrollto").click(function () {
	        var elementClick = $(this).attr("href")
	        var destination = $(elementClick).offset().top;
	        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 300);
	        return false;
	    });
	//*************************плавная прокрутка
	//*************************стрелка "наверх"
	var scroll_status;
	var scroll_flag=10;//порог скрытия открытия кнопки "прокрутка вверх"
	$(document).on("scroll", function(){
		scroll_status=$(document).scrollTop();
		if (scroll_status>=scroll_flag){
			$(".go_top_button").removeClass('go_top_button_disable');
			$(".go_top_button").addClass('go_top_button_enable');
		}
		  else if(scroll_status<scroll_flag){
			$(".go_top_button").removeClass('go_top_button_enable');
			$(".go_top_button").addClass('go_top_button_disable');
		  }
	});
	// *************************стрелка "наверх"
	//************************** start menu
	function open_close_head_menu(){
		if($('.fly_head_menu').hasClass('closed')){
			$('.fly_head_menu').removeClass('closed');
			$('.head_menu_close_key').stop().fadeIn(300);
		} else{
			$('.fly_head_menu').addClass('closed');
			$('.head_menu_close_key').stop().fadeOut(300);
		}
	}
	$('.open_head_menu_key').on('click', function(){
		open_close_head_menu();
	});
	$('.head_menu_close_key').on('click', function(){
		open_close_head_menu();
	});
	//************************** end menu
    //**************************start fancybox
    $("[data-fancybox]").fancybox({
            idleTime  : false,
            margin    : 0,
            infobar   : false,
            thumbs    : {
                hideOnClose : false
            },
            touch : {
                vertical : 'auto'
            },
            buttons : [
                'close',
                'thumbs',
                'slideShow',
            ],
            arrows: true,
            animationEffect   : false,
            closeClickOutside : true,
            zoom : false,

            // Customize caption area - append an advertisement
            caption : function( instance ) {
                var advert = '<div class="ad">'+ ( $(this).data('caption') || '' )+ '</div>';

                return advert ;
            }
    });
    //**************************end fancybox
});