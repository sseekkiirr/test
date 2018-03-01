$(document).ready(function(){
	var window_W;
	var maxi_point=1201;
	var large_point=769;
	var medium_point=481;
	var window_condition;
	var cond_suffix;
//****************************************************************

		check_window_W();
		check_window_condition();
		run_fix_slider();



	
	$(window).on('resize', function(){
		// console.log("resized");
		check_window_W();
		check_window_condition();
	});
	function check_window_W(){
		window_W=$(window).width();
	}
	function check_window_condition(){
		if(window_W>=maxi_point){
			window_condition="maxi";
			cond_suffix="-ma";
		};
		if((window_W<maxi_point)&&(window_W>=large_point)){
			window_condition="large";
			cond_suffix="-l";
		};
		if((window_W<large_point)&&(window_W>=medium_point)){
			window_condition="medium";
			cond_suffix="-me";
		}
		if(window_W<medium_point){
			window_condition="small";
			cond_suffix="-s";
		}
	}

	function run_fix_slider(){
		$('.js_fix_slider').each(function(index, el) {
			fix_slider_functions($(this));
		});
	}
	function fix_slider_functions(dom){
		var slide_n=dom.find('.item').length;
		var frame_W;
		var maxi;
		var large;
		var medium;
		var small;
		var all;
		var frames_on_screen;
		var current_frame;
		var target_frame;
		var move_range;
		var check_timer=dom.data("timer");
		var check_deep=dom.data("deep");
		var check_line=dom.data("line");
		var check_responsive=dom.data("responsive");
		var banner_interval;
		var slider_id=dom.data('id');
		var banner_status;
		var move_speed=$(this).data("move-speed");

		get_cells();
		mark_items();
		calculate_line();
		get_frames_on_screen();
		current_frame=frames_on_screen;
		make_slidelist();





		
		
		$(window).on('resize', function(){
			calculate_line();
			get_frames_on_screen();
			make_slidelist();
		});


		function refresh_timer(){
			banner_interval = setInterval (function(){
				repeat_banner();
			}, slide_time);
		}
		function repeat_banner(){
			dom.find('.js_next').click();
		}

		if(check_timer==true){
			var slide_time=dom.data("slide-time");
			banner_status='start';
			refresh_timer();
		}


		function get_cells(){
			maxi=dom.data('maxi');
			large=dom.data('large');
			medium=dom.data('medium');
			small=dom.data('small');
			all=dom.data('all');
			maxi=parseInt(maxi);
			large=parseInt(large);
			medium=parseInt(medium);
			small=parseInt(small);
			all=parseInt(all);
		}
		function mark_items(){
			var i=1;
			var class_template="";
			var temp_class="";

			function check_cell(cond){
				temp_class=dom.data(cond);
				temp_class=parseInt(temp_class);
				if(check_deep==true){
					var parentsize=dom.data("parentsize-"+cond);
					temp_class=parentsize/temp_class;
				} else{
					temp_class=12/temp_class;
				}
			}
			function write_id(f_class_template){
				dom.find('.item').each(function(index, el) {
					if (!$(this).hasClass(f_class_template+' slide_'+i)){
						$(this).addClass(f_class_template+' slide_'+i);
						var slide_margin_test=$(this).css("margin-right");
					}
					i++;
				});
			}
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
						dom.append("<div class='carousel_line_check_W_item "+line_condition+" c-"+temp_class+suffix+"' style='margin-right:1.1%!important;'></div>");
						var temp_line_item_W=$(".carousel_line_check_W_item."+line_condition)[0].getBoundingClientRect().width;
						var temp_line_item_margin=dom.find('.carousel_line_check_W_item').css("margin-right");
						var px_pos=temp_line_item_margin.indexOf('px');
						temp_line_item_margin=temp_line_item_margin.substring(0,px_pos);
						temp_line_item_margin=parseFloat(temp_line_item_margin);
						dom.find(".carousel_line_check_W_item").remove();
						dom.find(".item").css({
							"width":temp_line_item_W+"px",
							"margin-right":temp_line_item_margin+"px"
						});
					}
					if(check_responsive==true){
						make_line_item_w_responsive(window_condition, cond_suffix);
					} else {
						make_line_item_w_responsive("all", "");
					}
					write_id("");
				}
				responsive_line_items();
				$(window).on('resize', function(){
					responsive_line_items();
				});
			}
		}

		function calculate_line(){
		var slide_W=dom.find('.item:first-child')[0].getBoundingClientRect().width;
		var slide_margin=dom.find('.item:first-child').css("margin-right");
		// var slide_margin=dom.find('.item:first-child').css("margin");
		// console.log("slide_W = "+slide_W);
		// console.log("slide_margin = "+slide_margin);
		var px_pos=slide_margin.indexOf('px');
		slide_margin=slide_margin.substring(0,px_pos);
		slide_margin=parseFloat(slide_margin);
		slide_W=parseFloat(slide_W);
		frame_W=slide_margin+slide_W;
		var line_W=frame_W*slide_n;
			dom.children('.line').css({"width":line_W+"px"});
		}
		function get_frames_on_screen(){
			if(check_responsive==true){
				if(window_condition=="maxi"){
					frames_on_screen=maxi;
				}
				if(window_condition=="large"){
					frames_on_screen=large;
				}
				if(window_condition=="medium"){
					frames_on_screen=medium;
				}
				if(window_condition=="small"){
					frames_on_screen=small;
				}
			} else{
				frames_on_screen=all;
			}
			frames_on_screen=parseInt(frames_on_screen);
			$('#js_fix_slider_'+slider_id).data("frames-on-screen", frames_on_screen);
			slide_n=parseInt(slide_n);
			// console.log("frames_on_screen = "+frames_on_screen);
			// console.log("slide_n = "+slide_n);
			if(slide_n<=frames_on_screen){
				dom.find('.key').addClass('disabled');
				$('#js_fix_slider_slidelist_'+slider_id).parent('.slidelist_container').addClass('disabled');
			} else if(slide_n>frames_on_screen){
				dom.find('.key').removeClass('disabled');
				$('#js_fix_slider_slidelist_'+slider_id).parent('.slidelist_container').removeClass('disabled');
			}
		}
		function slidekey_click(clicked_key){
			clicked_key.siblings('.js_slidekey').removeClass('active');
			// var slider_id=clicked_key.parent('.js_fix_slider_slidelist').data('id');
			target_frame=clicked_key.data('id');
			// console.log("target_frame = "+target_frame);
			current_frame=target_frame;
			move_range=(target_frame-frames_on_screen)*(frame_W);
			animate_line("-", move_range, slider_id);
			clicked_key.addClass('active');
			// console.log("current_frame = "+current_frame);
			return current_frame;
		}
		function make_slidelist(){
			var points_n=slide_n-frames_on_screen+1;
			// var slider_id=dom.data('id');
			$('#js_fix_slider_slidelist_'+slider_id).html("");
			for (var i=1; i<=points_n; i++){
				// console.log("current_frame = "+current_frame);
				var temp_id=i+frames_on_screen-1;
				if (current_frame==temp_id){
					$('#js_fix_slider_slidelist_'+slider_id).append("<div class='js_slidekey active' data-id='"+temp_id+"'></div>");
				} else{
					$('#js_fix_slider_slidelist_'+slider_id).append("<div class='js_slidekey' data-id='"+temp_id+"'></div>");
				}
			}

			$('.js_slidekey').on('click', function(){
				if(check_timer==true){
					if(banner_status=="start"){
						slidekey_click($(this));
						banner_status="in progress";
					}
				} else{
					slidekey_click($(this));
				}
				// slidekey_click($(this));
			});
		}
		function animate_line(way, range, slider_id){
			dom.find('.js_prev').unbind('click');
			dom.find('.js_next').unbind('click');
			$('#js_fix_slider_slidelist_'+slider_id).find('.js_slidekey').unbind('click');
			if(check_timer==true){
				clearInterval(banner_interval);
			}
			$("#js_fix_slider_"+slider_id).children('.line').stop().animate({
				"left":way+range+"px"
			}, move_speed, function(){
				current_frame=target_frame;
			});
			if(check_timer==true){
				refresh_timer();
			}
			next_key_bind_click($('#js_fix_slider_'+slider_id).find('.js_next'));
			prev_key_bind_click($('#js_fix_slider_'+slider_id).find('.js_prev'));
			slidelist_bind_click($('#js_fix_slider_slidelist_'+slider_id).find('.js_slidekey'));
		}
		function mark_slidekey(id){
			$('#js_fix_slider_slidelist_'+id).find('.js_slidekey').removeClass('active');
			$('#js_fix_slider_slidelist_'+id+' .js_slidekey:nth-child('+(current_frame-frames_on_screen+1)+')').addClass('active');
		}
		function click_next_key(clicked_key){
			// var slider_id=clicked_key.parent('.js_fix_slider').data('id');
			frames_on_screen=$('#js_fix_slider_'+slider_id).data('frames-on-screen');
			frames_on_screen=parseInt(frames_on_screen);
			target_frame=current_frame+1;
				// console.log('current_frame = '+current_frame);
			if(current_frame<slide_n){
				move_range=(target_frame-frames_on_screen)*(frame_W);
				// console.log('frame_W = '+frame_W);
				// console.log('slider_id = '+slider_id);
				// console.log('target_frame = '+target_frame);
				// console.log('current_frame = '+current_frame);
				// console.log('frames_on_screen = '+frames_on_screen);
				// console.log('move_range = '+move_range);
				animate_line("-", move_range, slider_id);
				current_frame++;
			} else{
				current_frame=frames_on_screen;
				target_frame=current_frame;
				move_range=0;
				animate_line("", move_range, slider_id);
			}
			mark_slidekey(slider_id);
		}
		function click_prev_key(clicked_key){
			// var slider_id=clicked_key.parent('.js_fix_slider').data('id');
			frames_on_screen=$('#js_fix_slider_'+slider_id).data('frames-on-screen');
			frames_on_screen=parseInt(frames_on_screen);
			target_frame=current_frame-1;
			if(current_frame>frames_on_screen){
				move_range=(target_frame-frames_on_screen)*(frame_W);
				animate_line("-", move_range, slider_id);
				current_frame=current_frame-1;
			} else{
				current_frame=slide_n;
				target_frame=slide_n;
				move_range=(target_frame-frames_on_screen)*(frame_W);
				animate_line("-", move_range, slider_id);
			}
			mark_slidekey(slider_id);
		}
		dom.find('.js_next').on('click', function(){
			if(check_timer==true){
				if(banner_status=="start"){
					click_next_key($(this));
					banner_status="in progress";
				}
			} else{
				click_next_key($(this));
			}
		});

		dom.find('.js_prev').on('click', function(){
			if(check_timer==true){
				if(banner_status=="start"){
					click_prev_key($(this));
					banner_status="in progress";
				}
			} else{
				click_prev_key($(this));
			}
		});





		function next_key_bind_click(clicked_key){
			clicked_key.bind('click', function(){
				click_next_key($(this));
			});
		}
		function prev_key_bind_click(clicked_key){
			clicked_key.bind('click', function(){
				click_prev_key($(this));
			});
		}
		function slidelist_bind_click(clicked_key){
			clicked_key.bind('click', function(){
				slidekey_click($(this));
			});
		}
		dom.find('.line').swipe( {
		        swipeLeft:leftSwipe,
		        swipeRight:rightSwipe,
		        threshold:20
		});
		function leftSwipe(event){
		    click_next_key($('#js_fix_slider_'+slider_id).find('.js_next'));
		}
		function rightSwipe(event){
			click_prev_key($('#js_fix_slider_'+slider_id).find('.js_prev'));
		}
	}
});