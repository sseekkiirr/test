
$(document).ready(function(){
var work_galery_template="<div class='shadow galery_family'>\n<div class='big_galery_zone galery_family'>\n<div class='shadov_fix_key'></div>\n<div class='photo_loadmessage_block'><p>Загрузка...</p></div>\n<img class='big_photo' src='' alt=''>\n<div class='galery_keys_container'>\n<div class='big_galery_keys big_galery_key_left galery_family'></div>\n<div class='big_galery_keys big_galery_key_right galery_family'></div>\n<div class='decorate_close'></div>\n<div class='big_description_container'></div>\n</div>\n</div>\n</div>";

var img_n=$('.js_mini_photo').length;
var mod_count=0;
	if(img_n!=0){
		add_html_for_galery();
		run_galery();
	} else if(img_n==0){
		check_mod_galery();
		if(mod_count!=0){
			add_html_for_galery();
			run_galery();
		}
	}
var alone_photo_n=$('.js_mini_photo_alone').length;
	if((alone_photo_n!=0)&&(img_n!=0)){
		add_html_for_galery();
		run_galery();
	}
function check_mod_galery(){

	for(var i=1;i<=12;i++){
		var temp_count=0;
		temp_count=$('.js_mod_galery_'+i).length;
		if(temp_count!=0){
			mod_count=mod_count+temp_count;
		}
	}
}
function add_html_for_galery(){
	$('body').append(work_galery_template);
}
function run_galery(){
	// mark_medium_images_if_need();
	function mark_medium_images_if_need(){
		$('.js_carousel_container').each(function() {
			var temp_carousel_size=$(this).children('.js_carousel_line').attr("popup");
			temp_carousel_size=parseInt(temp_carousel_size);
			// console.log("temp_carousel_size = "+temp_carousel_size);
			temp_carousel_size=temp_carousel_size+1;
			$(this).children('.js_galery_medium_preview_container').data("img-id", temp_carousel_size);
			$(this).children('.js_galery_medium_preview_container').addClass('test_'+temp_carousel_size);
		});
	}
	$('.decorate_close, .shadov_fix_key').on('click',function(){
			$(".big_photo").css({"opacity":"0"});
			$('.big_photo').attr('src','');
			$('.shadow').stop().fadeOut(500);
			$('.galery_keys_container').stop().fadeOut(500);
			$('.big_galery_zone').stop().fadeOut(500);
			if (alone_status==true){
				$('.big_description_container').css({"display":"none"});
				alone_descr="no_description";
			};
	});
	function when_photo_load(big_photo){
		big_photo.bindImageLoad(function(){
			big_photo.parent("div").children(".photo_loadmessage_block").fadeOut(100, function(){
				big_photo.stop().animate({
					"opacity":"1"
				}, 900);
			});
			var $big_description_container;
			if(check_preview!=true){
				$big_description_container=$('.big_description_container');
			} else if(check_preview==true){
				$big_description_container=big_photo.parent("div").children(".medium_description_container");
			}

			if (alone_status==true){
				if(alone_descr=="no_description"){
					$big_description_container.css({"display":"none"});
				} else if(check_medium!=true){
					$big_description_container.css({"display":"table"});
					$big_description_container.html(alone_descr);
				};
			} else if (alone_status==false) {
				if(galery_description_lib[current_photo_ID]=="no_description"){
					$big_description_container.css({"display":"none"});
				} else if(check_medium!=true){
					$big_description_container.css({"display":"table"});
					$big_description_container.html(galery_description_lib[current_photo_ID]);
				};
			};
			if (check_preview!=true){
				resize_big_photo_wrapper(big_photo);
			}
		});	
	};

	var key_W=100;
	var key_margin=30;


	function resize_big_photo_wrapper(){
		big_photo_H=$('.big_photo').height();
		big_photo_W=$('.big_photo').width();
		// ****фикс дробной части
		$('.big_photo').css({"width":big_photo_W+"px", "height":big_photo_H+"px", "margin-left":"-"+big_photo_W/2+"px", "margin-top":"-"+big_photo_H/2+"px"});
		// ****фикс дробной части
		$('.galery_keys_container').css({"width":big_photo_W+"px", "height":big_photo_H+"px"});
	}
	$(window).on("resize", function(){
		resize_big_photo_wrapper();
		var temp_src=$('.big_photo').attr("src");
		change_big_photo_when_click_on_mini(temp_src, $('.big_photo'));
	});
	function change_big_photo_when_click_on_mini(f_path, big_photo){
		big_photo.parent("div").children(".photo_loadmessage_block").fadeIn(100, function(){
			big_photo.attr("src", f_path);
			if (alone_status==true){
				$('.big_galery_keys').css({
					"display":"none"
				});
			} else if((alone_status==false)&&(check_preview!=true)){
				$('.big_galery_keys').css({
					"display":"block"
				});
			};
			big_photo.css({"width":"", "height":""});
			when_photo_load(big_photo);
		});
	}

	var current_photo_ID='current';
	var old_photo_ID='old';
	var current_photo_name;
	var galery_names_lib=[];
	var galery_description_lib=[];
	var i_src;
	var i_new_src;
	var descr_check;
	var carousel_size;
	var carousel_check;
	var true_img_n;
	var multy_container=false;



	function prepare_carousel_if_need(){
		carousel_check=$('.js_carousel_mark').length;
		if (carousel_check>0){
			carousel_size=$('.js_carousel_mark').attr('popup');
			carousel_size=parseInt(carousel_size);
			// console.log("carousel_size = "+carousel_size);
		} else if(carousel_check==0){
			carousel_size=0;
			// console.log("carousel_size = "+carousel_size);
		}


		if(carousel_size!=0){
			// true_img_n=img_n;
			true_img_n=img_n-(carousel_size*2);
		} else if(carousel_size==0){
			true_img_n=img_n;
		}
	}
	function prepare_carousel_if_need_multy(photo){

		if(check_medium!=true){
			carousel_check=photo.parent('.js_carousel_mark').length;
			if (carousel_check>0){
				carousel_size=photo.parent('.js_carousel_mark').attr('popup');
				carousel_size=parseInt(carousel_size);
			} else if(carousel_check==0){
				carousel_size=0;
			}
		} else if(check_medium==true){
			carousel_check=photo.parent('div').children('.js_carousel_mark').length;
			if (carousel_check>0){
				carousel_size=photo.parent('div').children('.js_carousel_mark').attr('popup');
				carousel_size=parseInt(carousel_size);
			} else if(carousel_check==0){
				carousel_size=0;
			}
		}
		if(carousel_size!=0){
			// true_img_n=img_n;
			true_img_n=img_n-(carousel_size*2);
		} else if(carousel_size==0){
			true_img_n=img_n;
		}
	}

// console.log("true_img_n = "+true_img_n);
// ***********проверка на наличие модуля (если картинки вставляли с помощью стандартного редактора джумлы)
	var mod_check=0;
	var mod_items_per_row=0;
	var separator_flag=0;
	var original_class_val=0;//это подстраховка если контент менеджер в класс фигню напишет
	var mod_galery_items_template="";
	function check_mod_galery(){
		for (var i=1;i<=12;i++){
			mod_check=$('.js_mod_galery_'+i).length;
			if (mod_check>0){
				if((i==1)||(i==2)||(i==3)||(i==4)||(i==6)||(i==12)){
					mod_items_per_row=12/i;
					separator_flag=i;
					original_class_val=i;
				} else if(i==5){
					mod_items_per_row=12/4;
					separator_flag=4;
					original_class_val=i;
				} else if((i==7)||(i==8)||(i==9)||(i==10)||(i==11)){
					mod_items_per_row=12/6;
					separator_flag=6;
					original_class_val=i;
				}
				$('.js_mod_galery_'+i).each(function() {
					// console.log("js_mod_galery_"+i);
					clean_mod_galery($(this));
				});
				
				// wrapp_mod_galery_items();
			}
		}
	}
	function clean_mod_galery(dom){
		var check_garbage=0;
		check_garbage=dom.children('p').length;
		if(check_garbage>0){
			dom.children('p').each(function() {
				mod_galery_items_template=mod_galery_items_template+$(this).html();
			});
			dom.children('p').remove();
			dom.append("<div class='row mod_galery_row js_galery_container' id='new_galery_row'></div>");
		} else if(check_garbage==0){
			mod_galery_items_template=mod_galery_items_template+dom.html();
			dom.empty();
			dom.append("<div class='row mod_galery_row js_galery_container' id='new_galery_row'></div>");
		}
		$('#new_galery_row').append(mod_galery_items_template);
		mod_galery_items_template='';
		$('#new_galery_row').attr('id', '');
		wrapp_mod_galery_items(dom);

	}
	function wrapp_mod_galery_items(dom){
		var mod_item_count=1;
		dom.children('.mod_galery_row').children('img').each(function() {
			if(mod_item_count%separator_flag!=0){
				$(this).wrap("<div class='cell-"+mod_items_per_row+" js_mini_photo'></div>");
			} else if(mod_item_count%separator_flag==0){
				$(this).wrap("<div class='cell-"+mod_items_per_row+" js_mini_photo cell-clear'></div>");
			}
			mod_item_count++;
		});
		make_img_list(1);
	}
	check_mod_galery();

// ***********конец проверка на наличие модуля (если картинки вставляли с помощью стандартного редактора джумлы)
if(mod_check==0){
	make_img_list(1);
}
mark_medium_images_if_need();

	function make_img_list(photo){
		// console.log("check_medium = "+check_medium);
		var img_count=1;
		var $temp_img;
		if(multy_container==false){

			prepare_carousel_if_need();

			$('.js_mini_photo').each(function() {
				$temp_img=$(this);
				make_img_list_body($temp_img, img_count);
				img_count++;
			});
			// console.log("galery_names_lib = "+galery_names_lib);
		} else if(multy_container==true){
			galery_names_lib=[];
			galery_description_lib=[];

			prepare_carousel_if_need_multy(photo);

			if(check_medium!=true){
				true_img_n=photo.parent("div").children('.js_mini_photo').length;
			} else if(check_medium==true){
				true_img_n=photo.parent("div").children('.js_galery_container').children('.js_mini_photo').length;
			}
			
			for (var i=1; i<=true_img_n; i++){
				if(check_medium!=true){
					$temp_img=photo.parent(".js_galery_container").children('.js_mini_photo:nth-child('+i+')');
				} else if(check_medium==true){
					$temp_img=photo.parent("div").children(".js_galery_container").children('.js_mini_photo:nth-child('+i+')');
				}
				
				var temp_img_src=$temp_img.children('img').attr('src');
				make_img_list_body($temp_img, i);
			}
			if(carousel_check!=0){
				true_img_n=true_img_n-(carousel_size*2);
				// console.log("!!!true_img_n = "+true_img_n);
			}

			// console.log("galery_names_lib = "+galery_names_lib);
		}

	}
	function make_img_list_body(image, img_count){
			i_src=image.children('img').attr('src');
			descr=image.children('.js_photo_description').html();
			if((descr=="")||(descr=="undefined")||(descr==" undefined")||(descr==undefined)){
				descr="no_description";
			}
			i_new_src=i_src.replace("/mini/", "/maxi/");
			image.data("img-id", img_count);
			galery_names_lib[img_count]=i_new_src;
			galery_description_lib[img_count]=descr;
	}

	var src;
	var new_src;
	var path;
	var $photo;
	var alone_status=false;
	var check_preview=false;
	var check_medium=false;
	var alone_descr="no_description";
	var first_time_medium=true;
	function check_multy_container(photo){
		if(photo.parent('div').is(".js_galery_container")){
			multy_container=true;
			check_preview=photo.parent('div').data('preview');
		} else{
			multy_container=false;
			check_preview=false;
		}
	}
	$(".js_mini_photo").on('click', function(){
		$photo=$(this);
		alone_status=false;
		check_multy_container($photo);
		check_medium=$(this).data("medium");

			if((check_preview!=true)&&(check_medium==true)){
				multy_container=true;
			}
			if(check_preview==true){
				mark_preview_photo($photo);
				first_time_medium=false;
			}
			make_img_list($photo);
			js_mini_photo_click($photo);	

	});
	$(".js_mini_photo_alone").on('click', function(){
		$photo=$(this);
		alone_descr=$photo.children('.js_photo_description').children('p').text();
		if(alone_descr==""){
			alone_descr="no_description";
		}
		alone_status=true;
		js_mini_photo_click($photo);
	});
	function mark_preview_photo(photo){
		photo.parent("div").children('.js_mini_photo').removeClass('active_preview');
		photo.addClass('active_preview');
	}
	function js_mini_photo_click(f_photo){
		// console.log("check_medium = "+check_medium);
		if(check_medium!=true){
			src=f_photo.children('img').attr('src');
			new_src=src.replace("/mini/", "/maxi/");
			current_photo_ID=f_photo.data("img-id");
			current_photo_ID=parseInt(current_photo_ID);
			// console.log("current_photo_ID = "+current_photo_ID);
			if((check_preview==true)&&(carousel_size!=0)){
				f_photo.parent('.js_galery_container').parent('.js_carousel_container').children('.js_galery_medium_preview_container').data("img-id", current_photo_ID);
				// console.log("!!! current_photo_ID "+current_photo_ID);
			}
		} else if(check_medium==true){
			src=f_photo.children('img').attr('src');
			new_src=src.replace("/mini/", "/maxi/");
			current_photo_ID=f_photo.data("img-id");
			current_photo_ID=parseInt(current_photo_ID);
			// console.log("current_photo_ID = "+current_photo_ID);
			if(first_time_medium==true){
				first_time_medium=false;
				if(carousel_size==0){
					current_photo_ID=1;
				} else{
					current_photo_ID=carousel_size+1;
				}
			}
		}

		if(current_photo_ID<(1+carousel_size)){
			current_photo_ID=current_photo_ID+true_img_n;
		} else if(current_photo_ID>(carousel_size+true_img_n)){
			current_photo_ID=current_photo_ID-true_img_n;
		}
		old_photo_ID=current_photo_ID;
		if(check_preview!=true){
			$('.shadow').stop().fadeIn(500);
			$('.galery_keys_container').stop().fadeIn(500);
			$('.big_galery_zone').stop().fadeIn(500, function(){
				change_big_photo_when_click_on_mini(new_src, $('.big_photo'));
			});
		} else if (check_preview==true){
			var $medium_photo=f_photo.parent("div").parent("div").children('.js_mini_photo').children('.js_medium_photo');
			change_big_photo_when_click_on_mini(new_src, $medium_photo);
		}

	}

	$('.big_galery_key_right').on('click', function(){
		current_photo_ID++;
		if(current_photo_ID>(carousel_size+true_img_n)){
			current_photo_ID=current_photo_ID-true_img_n;
		}

		current_photo_name=galery_names_lib[current_photo_ID];
			$('.big_photo').animate({
				"opacity": "0"
			},300, function() {
				change_big_photo_when_click_on_mini(current_photo_name, $('.big_photo'));
			});
	});
	$('.big_galery_key_left').on('click', function(){
		current_photo_ID=current_photo_ID-1;
		if(current_photo_ID<(1+carousel_size)){
			// console.log("current_photo_ID = "+current_photo_ID);
			current_photo_ID=current_photo_ID+true_img_n;
			// console.log("current_photo_ID = "+current_photo_ID);
		}
		current_photo_name=galery_names_lib[current_photo_ID];
			$('.big_photo').animate({
				"opacity": "0"
			},300, function() {
				change_big_photo_when_click_on_mini(current_photo_name, $('.big_photo'));
			});
	});
}




});