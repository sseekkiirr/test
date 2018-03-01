$(document).ready(function(){
	var maxi_point=1201;
	var large_point=769;
	var medium_point=481;
	var window_W;
	var condition="";
	var cond_suffix="";
	

	var check_carousel=$('.js_carousel_container').length;

	$(window).on('resize', function(){
		check_window_W();
	});
	check_window_W();

	if(check_carousel>0){
		$('.js_carousel_container').each(function(index, el) {
			run_carousel($(this));
		});
		
	}
	function check_window_W(){
		window_W=window.innerWidth;

		if(window_W>=maxi_point){
			condition="maxi";
			cond_suffix="-ma ";
		};
		if((window_W<maxi_point)&&(window_W>=large_point)){
			condition="large";
			cond_suffix="-l ";
		};
		if((window_W<large_point)&&(window_W>=medium_point)){
			condition="medium";
			cond_suffix="-me ";
		}
		if(window_W<medium_point){
			condition="small";
			cond_suffix="-s ";
		}
	}
	function run_carousel(carousel_container){
		var items_on_screen;
		var check_responsive=carousel_container.data("responsive");
		var check_deep=carousel_container.data("deep");
		var item_size=0;
		var items_n=carousel_container.find(".item").length;
		var current_item=1;
		var check_timer=carousel_container.data("timer");
		var move_speed=carousel_container.data("move-speed");
		var banner_interval;
		var check_line=carousel_container.data("line");
		var check_extreme=carousel_container.data("extreme");
		var check_extreme_counter=carousel_container.data("extreme-counter");
		var check_vertical=carousel_container.data("vertical");

		console.log("check_vertical = "+check_vertical);



		function refresh_timer(){
			banner_interval = setInterval (function(){
				repeat_banner();
			}, slide_time);
		}
		function repeat_banner(){
			carousel_container.find('.js_carousel_key.next').click();
		}

		if(check_timer==true){
			var slide_time=carousel_container.data("slide-time");
			refresh_timer();
		}


		function check_items_on_screen(){
			if(check_responsive==true){
				items_on_screen=carousel_container.data(condition);
				// console.log("items_on_screen = "+items_on_screen);
			} else{
				items_on_screen=carousel_container.data("all");
			}
		}
		$(window).on('resize', function(){
			check_items_on_screen();
			get_item_size();
			fix_line_position();
			check_extreme_class();
			place_items();
			check_keys();
		});
		check_items_on_screen();


		function mark_items(){
			var i=1;
			var class_template="";
			var temp_class="";

			function check_cell(cond){
				temp_class=carousel_container.data(cond);
				temp_class=parseInt(temp_class);
				if(check_deep==true){
					var parentsize=carousel_container.data("parentsize-"+cond);
					temp_class=parentsize/temp_class;
				} else{
					temp_class=12/temp_class;
				}
			}
			function write_id(f_class_template){
				carousel_container.find('.item').each(function(index, el) {
					if (!$(this).hasClass(f_class_template+' slide_'+i)){
						$(this).addClass(f_class_template+' slide_'+i);
					}
					i++;
				});
			}
			if(check_vertical!=true){
				if (check_line!=true){
					if(check_responsive==true){
						check_cell("maxi");
						class_template=class_template+"c-"+temp_class+"-ma-d ";
						check_cell("large");
						class_template=class_template+"c-"+temp_class+"-l-d ";
						check_cell("medium");
						class_template=class_template+"c-"+temp_class+"-me-d ";
						check_cell("small");
						class_template=class_template+"c-"+temp_class+"-s-d ";
					} else{
						check_cell("all");
						class_template=class_template+"c-"+temp_class+"-d ";
					}
					write_id(class_template);
				} else if(check_line==true){
					function responsive_line_items(){
						i=1;
						function make_line_item_w_responsive(line_condition, suffix){
							check_cell(line_condition);
							carousel_container.find('.line_wrapper').append("<div class='carousel_line_check_W_item "+line_condition+" c-"+temp_class+suffix+"' style='margin-right:1.1%!important;'></div>");
							var temp_line_item_W=$(".carousel_line_check_W_item."+line_condition)[0].getBoundingClientRect().width;
							var temp_line_item_margin=carousel_container.find('.carousel_line_check_W_item').css("margin-right");
							var px_pos=temp_line_item_margin.indexOf('px');
							temp_line_item_margin=temp_line_item_margin.substring(0,px_pos);
							temp_line_item_margin=parseFloat(temp_line_item_margin);
							carousel_container.find(".carousel_line_check_W_item").remove();
							carousel_container.find(".item").css({
								"width":temp_line_item_W+"px",
								"margin-right":temp_line_item_margin+"px"
							});
						}
						if(check_responsive==true){
							make_line_item_w_responsive(condition, cond_suffix);
						} else {
							make_line_item_w_responsive("all", "");
						}
						write_id("");
					} /*end responsive_line_items()*/
					responsive_line_items();
					$(window).on('resize', function(){
						responsive_line_items();
					});
				} /*end if check_line = true*/
			} /*end if check_vertical = true*/ else{
				write_id("");
			}

		}
		mark_items();

		function get_item_size(){
			if(check_vertical!=true){
				var temp_W=carousel_container.find('.item:first-child')[0].getBoundingClientRect().width;
				var temp_margin=carousel_container.find('.item:first-child').css("margin-right");
				var px_pos=temp_margin.indexOf('px');
				temp_margin=temp_margin.substring(0,px_pos);
				temp_margin=parseFloat(temp_margin);
				item_size=temp_W+temp_margin;
			} else{
				var temp_H=carousel_container.find('.item:first-child')[0].getBoundingClientRect().height;
				var temp_margin=carousel_container.find('.item:first-child').css("margin-bottom");
				var px_pos=temp_margin.indexOf('px');
				temp_margin=temp_margin.substring(0,px_pos);
				temp_margin=parseFloat(temp_margin);
				item_size=temp_H+temp_margin;
			}
		}
		get_item_size();

		function fix_line_position(){
			if(check_vertical!=true){
				var line_W=item_size*(items_on_screen+2);
				carousel_container.find('.line').css({
					"width":line_W+"px",
					"left":"-"+item_size+"px"
				});
			} else{
				var line_H=item_size*(items_on_screen+2);
				carousel_container.find('.line').css({
					"height":line_H+"px",
					"top":"-"+item_size+"px"
				});
			}

		}
		fix_line_position();

		function make_start_position(){
			if(check_vertical!=true){
				var left_pos=0;
				carousel_container.find(".slide_"+items_n).css({"left":left_pos+"px"});
				left_pos=left_pos+item_size;
				for(var i=1; i<=items_on_screen+1;i++){
					carousel_container.find(".slide_"+i).css({"left":left_pos+"px"});
					left_pos=left_pos+item_size;
				}
			} else{
				var top_pos=0;
				carousel_container.find(".slide_"+items_n).css({"top":top_pos+"px"});
				top_pos=top_pos+item_size;
				for(var i=1; i<=items_on_screen+1;i++){
					carousel_container.find(".slide_"+i).css({"top":top_pos+"px"});
					top_pos=top_pos+item_size;
				}
			}

		}
		make_start_position();

		var left_item_id;
		var right_item_id;

		function place_right_item(way){
			left_item_id=current_item-1;
			right_item_id=current_item+items_on_screen;
			var item_to_move;
			if (right_item_id>items_n){
				right_item_id=right_item_id-items_n;
			}
				var check_fix_small_carousel=items_n-items_on_screen;
				if(check_fix_small_carousel<2){
					if(way=="prev"){
						item_to_move="";
					} else{
						if(left_item_id==0){
							left_item_id=items_n;
						}
						item_to_move=left_item_id;
					}
					
				} else{
					if(way=="prev"){
						item_to_move="";
					} else{
						item_to_move=right_item_id;
					}
					
				}

			if(check_vertical!=true){
				carousel_container.find(".slide_"+item_to_move).css({
					"left":((items_on_screen+1)*item_size)+"px",
					"z-index":"10"
				});
			} else{
				carousel_container.find(".slide_"+item_to_move).css({
					"top":((items_on_screen+1)*item_size)+"px",
					"z-index":"10"
				});
			}

		}
		function place_left_item(way){
			left_item_id=current_item-1;
			right_item_id=current_item+items_on_screen;
			var item_to_move;
			if (left_item_id<1){
				left_item_id=items_n;
			}
				var check_fix_small_carousel=items_n-items_on_screen;
				if(check_fix_small_carousel<2){
					if(way=="prev"){
						item_to_move=left_item_id;
					} else{
						item_to_move="";
					}
				} else{
					if(way=="prev"){
						item_to_move=left_item_id;
					} else{
						item_to_move="";
					}
				}
			if(check_vertical!=true){
				carousel_container.find(".slide_"+item_to_move).css({
					"left":"0px",
					"z-index":"10"
				});
				carousel_container.find(".slide_"+item_to_move).addClass('test');
			} else{
				carousel_container.find(".slide_"+item_to_move).css({
					"top":"0px",
					"z-index":"10"
				});
			}

		}	

		function check_extreme_class(){
			if(items_on_screen>=items_n){
				carousel_container.find(".item").removeClass('extreme');
			}
		}
		function place_items(){
			function mark_extreme(){
				if((check_extreme==true)&&(items_on_screen<items_n)){
					carousel_container.find(".item").removeClass('extreme');
					carousel_container.find(".item:nth-child("+current_item+")").addClass('extreme');
					var right_extreme=current_item+items_on_screen-1;
					var right_extreme_overflow=right_extreme+1;
					var left_extreme_overflow=current_item-1;
					if(right_extreme>items_n){
						right_extreme=right_extreme-items_n;
					}
					if(right_extreme_overflow>items_n){
						right_extreme_overflow=right_extreme_overflow-items_n;
					}
					if(left_extreme_overflow<=0){
						left_extreme_overflow=items_n;
					}
					carousel_container.find(".slide_"+current_item).addClass('extreme');
					carousel_container.find(".slide_"+left_extreme_overflow).addClass('extreme');
					carousel_container.find(".slide_"+right_extreme).addClass('extreme');
					carousel_container.find(".slide_"+right_extreme_overflow).addClass('extreme');
				}	
			}
			mark_extreme();
			if(check_timer==true){
				clearInterval(banner_interval);
			}
			var move_counter=1;
			if(items_on_screen<items_n){
				var move_space=item_size;
				if(check_vertical!=true){
					carousel_container.find(".line").css({"left":"-"+item_size+"px"});
				} else{
					carousel_container.find(".line").css({"top":"-"+item_size+"px"});
				}
			} else{
				var move_space=0;
				if(check_vertical!=true){
					carousel_container.find(".line").css({"left":"0px"});
				} else{
					carousel_container.find(".line").css({"top":"0px"});
				}
				
			}
			
			
			if(check_vertical!=true){
				carousel_container.find(".item").css({
					"left":"-"+(move_space*2)+"px",
					"z-index":"0"
				});
			} else{
				carousel_container.find(".item").css({
					"top":"-"+(move_space*2)+"px",
					"z-index":"0"
				});
			}

			// if(items_on_screen<items_n){
			// 	place_left_item();
			// }
			while(move_counter<=items_on_screen){
				var temp_slide_id=current_item+move_counter-1;
				if (temp_slide_id>items_n){
					temp_slide_id=temp_slide_id-items_n;
				}
				if(check_vertical!=true){
					carousel_container.find(".slide_"+temp_slide_id).css({
						"left":move_space+"px",
						"z-index":"10"
					});
				} else{
					carousel_container.find(".slide_"+temp_slide_id).css({
							"top":move_space+"px",
							"z-index":"10"
						});
				}

				move_space=move_space+item_size;
				move_counter++;
			}
			
			// if(items_on_screen<items_n){
			// 	place_right_item();
			// }
			next_key_bind_click();
			prev_key_bind_click();
			if((check_timer==true)&&(items_on_screen<items_n)){
				refresh_timer();
			}
		}

		function check_keys(){
			console.log("items_on_screen = "+items_on_screen);
			if(items_on_screen<items_n){
				carousel_container.find('.js_carousel_key').removeClass('hidden');
			} else{
				carousel_container.find('.js_carousel_key').addClass('hidden');
			}
		}
		check_extreme_class();
		place_items();
		check_keys();

		function move_next(){
			carousel_container.find('.js_carousel_key.prev').unbind('click');
			carousel_container.find('.js_carousel_key.next').unbind('click');
			if(items_on_screen<items_n){
				place_left_item("next");
				place_right_item("next");
			}
			if(check_vertical!=true){
				carousel_container.find(".line").stop().animate({
					"left":"-="+item_size+"px"
				}, move_speed, function(){
					current_item++;
					if(current_item>items_n){
						current_item=1;
					}
					place_items();
				});
			} else{
				carousel_container.find(".line").stop().animate({
					"top":"-="+item_size+"px"
				}, move_speed, function(){
					current_item++;
					if(current_item>items_n){
						current_item=1;
					}
					place_items();
				});
			}
		}


		function move_prev(){
			carousel_container.find('.js_carousel_key.prev').unbind('click');
			carousel_container.find('.js_carousel_key.next').unbind('click');
			if(items_on_screen<items_n){
				place_left_item("prev");
				place_right_item("prev");
			}
			if(check_vertical!=true){
				carousel_container.find(".line").stop().animate({
					"left":"+="+item_size+"px"
				}, move_speed, function(){
					current_item=current_item-1;
					if(current_item<1){
						current_item=items_n;
					}
					place_items();
				});
			} else{
				carousel_container.find(".line").stop().animate({
					"top":"+="+item_size+"px"
				}, move_speed, function(){
					current_item=current_item-1;
					if(current_item<1){
						current_item=items_n;
					}
					place_items();
				});
			}
		}

		function next_key_bind_click(){
			carousel_container.find('.js_carousel_key.next').bind('click', function(){
				move_next();
			});
		}
		function prev_key_bind_click(){
			carousel_container.find('.js_carousel_key.prev').bind('click', function(){
				move_prev();
			});
		}


		if(check_vertical!=true){
			carousel_container.swipe( {
			        swipeLeft:leftSwipe,
			        swipeRight:rightSwipe,
			        threshold:30
			});
		} else{
			carousel_container.swipe( {
			        swipeUp:leftSwipe,
			        swipeDown:rightSwipe,
			        threshold:30
			});
		}
		function leftSwipe(event){
			var $key=carousel_container.find('.js_carousel_key.prev');
			if(!$key.hasClass('hidden')){
				$key.click();
			}
		}
		function rightSwipe(event){
			var $key=carousel_container.find('.js_carousel_key.next');
			if(!$key.hasClass('hidden')){
				$key.click();
			}
		}
	} //end run carousel function
});