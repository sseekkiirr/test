$(document).ready(function(){
	// var frames_N;
	var work_banner_speed=5000;
	var head_animate_speed=1500;// скорость анимации
	var head_banner_TYPE="js_head_banner";

	var news_animate_speed=1500;// скорость анимации
	var news_banner_TYPE="js_news_banner";
	


// prepare_banner(head_banner_TYPE, head_animate_speed);
// prepare_banner(head_banner_cat_TYPE, head_animate_speed);
// prepare_banner(news_banner_TYPE, news_animate_speed);

check_need_banner_or_not(head_banner_TYPE, head_animate_speed);
check_need_banner_or_not(news_banner_TYPE, news_animate_speed);

function check_need_banner_or_not(type, speed){
	var banners_n=$('.'+type).length;
	if (banners_n==1){
		prepare_banner(type, speed);
	}
}

function prepare_banner(type, speed){
	var slide_num=1;
	$('.'+type+'_slide').each(function() {
		$(this).addClass(type+'_slide_'+slide_num);
		slide_num++;
	});
	fade_banner(type, speed);
}




function fade_banner(type, speed){
	var frames_N=$('.'+type).children('.'+type+'_slide').length; //Количество кадров в банере
	var banner_interval;
	var current_frame=1;//Текущий кадр банера
	var slide_key_status=false;
	var slidelist_container_need=false;
	// console.log("type = "+type);
	// console.log("frames_N = "+frames_N);
	

	$('.'+type+'_slide_1').css({
		"z-index":"900",
		"display":"block"
	});
	function check_slidelist_container_need(type){
		slidelist_container_need=$('.'+type).data('slidelist');
		if(slidelist_container_need==true){
			build_slidelist(type);
		}
	}
	function build_slidelist(type){
		$('.'+type).append("<div class='wrapper_for_slidelist'><div class='"+type+"_slidelist_container'></div>");
		for(var i=1; i<=frames_N; i++){
			if(i==1){
				$('.'+type).children(".wrapper_for_slidelist").children("."+type+"_slidelist_container").append("<div class='slidekey "+type+"_slidekey "+type+"_slidekey_"+i+" "+type+"_slidekey_active' popup='"+i+"'></div>");
			} else{
				$('.'+type).children(".wrapper_for_slidelist").children("."+type+"_slidelist_container").append("<div class='slidekey "+type+"_slidekey "+type+"_slidekey_"+i+"' popup='"+i+"'></div>");
			}
			
		}
	}
	check_slidelist_container_need(type);

	function decorate_slidelist_mini(type){
		if(slidelist_container_need==true){
			$('.'+type+'_slidekey').removeClass(type+'_slidekey_active');
			$('.'+type+'_slidekey_'+next_frame).addClass(type+'_slidekey_active');
		}
	}
	function animate_IN(){
		$('.'+type+'_slide_'+next_frame).fadeIn(speed, function() {
			$(this).css({
				"opacity":"1",
				"z-index":"899"
			});
		});
	};
	function animate_OUT(){
		decorate_slidelist_mini(type);
		$('.'+type+'_slide_'+current_frame).fadeOut(speed, function(){
			$('.'+type+'_slide_'+next_frame).css({
				"z-index":"900"
			});
			current_frame=next_frame;
			left_key_bind_click();
			right_key_bind_click();
			slidekey_bind_click();
		});
	}
	function right_key_bind_click(){
		$('.'+type+'_key_right').bind('click', function(){
			full_animate_forward();
		});
	}
	function left_key_bind_click(){
		$('.'+type+'_key_left').bind('click', function(){
			full_animate_back();
		});
	}
	function slidekey_bind_click(){
		$('.'+type+'_slidekey').bind('click', function(){
			$('.'+type+'_slidekey').removeClass(type+'_slidekey_active');
			$(this).addClass(type+'_slidekey_active');
			next_frame=$(this).attr("popup");
			next_frame=parseInt(next_frame);
			slide_key_status=true;			
			if(next_frame!=current_frame){
				full_animate_forward();
			} else if(next_frame==current_frame){
				next_frame++;
			}
		});
	}

	var next_frame;
	function full_animate_forward(){

		clearInterval(banner_interval);
		$('.'+type+'_key_left').unbind('click');
		$('.'+type+'_key_right').unbind('click');
		$('.'+type+'_slidekey').unbind('click');
		if(slide_key_status==false){
			next_frame=current_frame+1;
		};
			
			if(next_frame<=frames_N){
				animate_IN();
			} else{
				next_frame=1;
				animate_IN();
			}
			animate_OUT();
		banner_status="in_progress";
		slide_key_status=false;
	refresh_timer();
	};
	function full_animate_back(){
		clearInterval(banner_interval);
		$('.'+type+'_key_left').unbind('click');
		$('.'+type+'_key_right').unbind('click');
		$('.'+type+'_slidekey').unbind('click');
			next_frame=current_frame-1;
			
			if(next_frame>=1){
				animate_IN();
			} else{
				next_frame=frames_N;
				animate_IN();
			}
			animate_OUT();

		banner_status="in_progress";
		slide_key_status=false;
	refresh_timer();
	};

	function refresh_timer(){
		banner_interval = setInterval (function(){
			repeat_banner();
		}, work_banner_speed);
	}
	function repeat_banner(){
	// console.log("type = "+type);
		full_animate_forward();
	}
banner_status='start';

refresh_timer();//запуск автоматической прокрутки
	$('.'+type+'_key_right').on('click', function(){
		if(banner_status=='start'){
			full_animate_forward();
		};
	});

	$('.'+type+'_key_left').on('click', function(){
		if(banner_status=='start'){
			full_animate_back();
		};
	});
	$('.'+type+'_slidekey').on('click', function(){
		if(banner_status=='start'){
			$('.'+type+'_slidekey').removeClass(type+'_slidekey_active');
			$(this).addClass(type+'_slidekey_active');
			next_frame=$(this).attr("popup");
			next_frame=parseInt(next_frame);
			// console.log("current_frame = "+current_frame);
			// console.log("next_frame = "+next_frame);
			slide_key_status=true;
			if(next_frame!=current_frame){
				full_animate_forward();
			} else if(next_frame==current_frame){
				next_frame++;
			}
		}
	});
}//end function fade_banner();


});