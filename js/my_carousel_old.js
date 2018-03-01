$(document).ready(function(){
	// пример как вызывать:
	// var TYPE_CUSTOM_NAME="CUSTOM_NAME";
	// var CUSTOM_NAME_prefix="js_CUSTOM_NAME_";
	// check_use_carousel_or_not(TYPE_CUSTOM_NAME, CUSTOM_NAME_prefix);
	// *******************************************************************************


	// var TYPE_galery_carousel="galery_carousel";
	// var galery_carousel_prefix="js_galery_carousel_";
	// check_use_carousel_or_not(TYPE_galery_carousel, galery_carousel_prefix);
	block_prefix="js_one_carousel_block_";
	var inside_key_L_template="<div class='js_carousel_keys_inside js_carousel_key_inside_left'></div>";
	var inside_key_R_template="<div class='js_carousel_keys_inside js_carousel_key_inside_right'></div>";
	var outside_key_L_template="<div class='js_carousel_keys_outside js_carousel_key_outside_left'></div>";
	var outside_key_R_template="<div class='js_carousel_keys_outside js_carousel_key_outside_right'></div>";
	
$('.js_carousel_container').each(function() {
	check_use_carousel_or_not($(this), $(this).children('.js_carousel_line'));
});
	function check_use_carousel_or_not(carousel_container, carousel_line){
		var blocks_on_screen=carousel_line.attr('popup');
		// console.log("blocks_on_screen = "+blocks_on_screen);
		var blocks_n=carousel_line.children('.js_one_carousel_block').length;//общее количество блоков
		// console.log("blocks_n = "+blocks_n);
		blocks_on_screen=parseInt(blocks_on_screen);//количество блоков на экране
		var check_need_grid_or_not=carousel_line.data("grid");
		if(check_need_grid_or_not!="no"){
			blocks_on_screen=make_grid(carousel_line, blocks_on_screen);
		}
		

		if (blocks_n>blocks_on_screen){
			endless_carousel(block_prefix, blocks_on_screen, blocks_n, carousel_line, carousel_container);
		}
		if(blocks_n<=blocks_on_screen){
			var one_block_W=carousel_line.children('.js_one_carousel_block:nth-child(1)')[0].getBoundingClientRect().width;
			// var one_block_W=carousel_line.children('.js_one_carousel_block:nth-child(1)').css("width");[0].getBoundingClientRect().width;
			var one_block_margin=carousel_line.children('.js_one_carousel_block:nth-child(1)').css("margin-right");
			// var one_block_margin=carousel_line.children('.js_one_carousel_block:nth-child(1)').css("margin-right");
			var px_pos=one_block_margin.indexOf('px');
			one_block_margin=one_block_margin.substring(0,px_pos);
			one_block_margin=parseFloat(one_block_margin);
			one_block_W=parseFloat(one_block_W);
			one_block_W=one_block_margin+one_block_W;
			var blocks_container_W=one_block_W*blocks_n;
			carousel_line.css({
				"width":blocks_container_W+"px",
				"left":"0px"
			});
			var galery_option=carousel_container.data("galery");
			if(galery_option==true){
				// carousel_container.addClass('js_carousel_mark');
				carousel_line.addClass('js_galery_container');
				carousel_line.children('.js_one_carousel_block').each(function() {
					$(this).addClass('js_mini_photo');
				});
			}
		}
		function make_grid(carousel_line, blocks_on_screen){
			var cell_n=12/blocks_on_screen;
			if(cell_n==5){
				cell_n=4;
				blocks_on_screen=4;
			}
			if((cell_n==7)||(cell_n==8)||(cell_n==9)||(cell_n==10)||(cell_n==11)){
				cell_n=6;
				blocks_on_screen=6;
			}
			carousel_line.children('.js_one_carousel_block').each(function() {
				$(this).addClass('cell-'+cell_n+'-deep');
			});
			return blocks_on_screen;
		}
	}


	function endless_carousel(block_prefix, blocks_on_screen, blocks_n, carousel_line, carousel_container){
		var keys_option=carousel_container.data("keys");
		var galery_option=carousel_container.data("galery");
		if(galery_option==true){
			carousel_line.addClass('js_carousel_mark');
			carousel_line.addClass('js_galery_container');
			carousel_line.children('.js_one_carousel_block').each(function() {
				$(this).addClass('js_mini_photo');
			});
		}
		var mark_count=1;
		var mark_back_count=blocks_n;
		// вычисление ширины одного контейнера с учетом отступа
		var one_block_W=carousel_line.children('.js_one_carousel_block')[0].getBoundingClientRect().width;
		var one_block_margin=carousel_line.children('.js_one_carousel_block').css("margin-right");

		// console.log(one_block_W);
		var px_pos=one_block_margin.indexOf('px');
		one_block_margin=one_block_margin.substring(0,px_pos);
		one_block_margin=parseFloat(one_block_margin);
		one_block_W=parseFloat(one_block_W);
		one_block_W=one_block_margin+one_block_W;
		// *****************************************************

		// Добавление маскирующих блоков в начало и в конец


		var blocks_last_lib=[];
		var blocks_start_lib=[];
		var blocks_lib=[];
		var $current_block_template;

		function make_blocks_lib(item, count){
			var start_lib_flag=blocks_n-blocks_on_screen+1;
			blocks_lib[count]=item;
		}
		function make_start_lib(){
			var flag=blocks_n-blocks_on_screen;
			var temp_count=blocks_n;

			var normal_count=1;
			var old_massive_count=blocks_n;
			var new_massive_count=1;

			for(var i=1; i<=blocks_on_screen;i++){
				blocks_start_lib[new_massive_count]=blocks_lib[old_massive_count];
				old_massive_count=old_massive_count-1;
				new_massive_count++;
			}
		}
		function make_last_lib(){
			var flag=blocks_n-blocks_on_screen;
			for(var i=1; i<=blocks_on_screen; i++){
				blocks_last_lib[i]=blocks_lib[i];
			}
		}

		function make_first_clones(first_item){
			for(var i=blocks_on_screen; i>0; i=i-1){
				$current_block_template=blocks_start_lib[i];
				$current_block_template.clone().insertBefore(first_item);
			}
		}
		function make_last_clones(){
			for(var i=1; i<=blocks_on_screen; i++){
				$current_block_template=blocks_last_lib[i];
				$current_block_template.clone().appendTo(carousel_line);
			}
		}
		carousel_line.children('.js_one_carousel_block').each(function(){
			make_blocks_lib($(this),mark_count);
			mark_count++;
		});
		make_start_lib();
		make_last_lib();
		var $first_item=carousel_line.children('.js_one_carousel_block:first-child');
		make_first_clones($first_item);
		make_last_clones();
		if(keys_option=="inside"){
			display_inside_keys();
		}
		if(keys_option=="outside"){
			carousel_container.wrap('<div class="row outside_keys_wrapper"></div>');
			display_outside_keys();
		}
		function display_inside_keys(){
			carousel_container.append(inside_key_L_template);
			carousel_container.append(inside_key_R_template);
		}
		function display_outside_keys(){
			carousel_container.parent('.outside_keys_wrapper').append(outside_key_L_template);
			carousel_container.parent('.outside_keys_wrapper').append(outside_key_R_template);
		}
		// *****************************************************

		// Установка ширины контейнера
		var new_blocks_n=carousel_line.children('.js_one_carousel_block').length;
		var blocks_container_W=new_blocks_n*one_block_W;


		var blocks_container_start_pos=one_block_W*blocks_on_screen;
		carousel_line.css({
			"width":blocks_container_W+"px",
			"left":"-"+blocks_container_start_pos+"px"
		});
		// console.log("new_blocks_n = "+new_blocks_n);
		// *****************************************************

		// движение контейнеров по клику на стрелки
		var animation_speed=300;
		var last_block_on_screen=blocks_on_screen*2;
		var right_start_pos=(new_blocks_n-blocks_on_screen*2)*one_block_W;

		function animate_blocks_right(key){
			carousel_line.animate({
				"left":"-="+one_block_W+"px"
			}, animation_speed, function(){
				
				key.bind('click', function(){
					on_key_right_click(key);
				});
			});
		}
		function animate_blocks_left(key){
			carousel_line.animate({
				"left":"+="+one_block_W+"px"
			}, animation_speed, function(){
				
				key.bind('click', function(){
					on_key_left_click(key);
				});
			});
		}
		function make_start_position(position){
			carousel_line.css({"left":"-"+position+"px"});
		}



		function on_key_left_click(key){
			key.unbind('click');
			if(last_block_on_screen>blocks_on_screen){
				animate_blocks_left(key);
				last_block_on_screen=last_block_on_screen-1;
			} else{
				last_block_on_screen=new_blocks_n-blocks_on_screen-1;
				make_start_position(right_start_pos);
				animate_blocks_left(key);
			};
		}
		function on_key_right_click(key){
			key.unbind('click');
			if(last_block_on_screen<new_blocks_n){
				animate_blocks_right(key);
				last_block_on_screen++;
			} else{
				last_block_on_screen=blocks_on_screen*2+1;
				make_start_position(blocks_container_start_pos);
				animate_blocks_right(key);
			};
		}

			
		if(keys_option=="outside"){
			carousel_container.parent(".outside_keys_wrapper").children('.js_carousel_key_'+keys_option+'_right').on('click', function(){
				on_key_right_click($(this));
			});
			carousel_container.parent(".outside_keys_wrapper").children('.js_carousel_key_'+keys_option+'_left').on('click', function(){
				on_key_left_click($(this));
			});
		}
		if(keys_option=="inside"){
			carousel_container.children('.js_carousel_key_'+keys_option+'_right').on('click', function(){
				on_key_right_click($(this));
			});

			carousel_container.children('.js_carousel_key_'+keys_option+'_left').on('click', function(){
				on_key_left_click($(this));
			});
		}



		// *****************************************************
	}




});