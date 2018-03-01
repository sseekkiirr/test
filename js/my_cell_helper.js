$(document).ready(function(){
	var normal_cell;
	var maxi;
	var large;
	var medium;
	var small;
	var check_galery;
	var check_deep;
	var target;
	var check_responsive;
	var parrent_size;
	var parrent_size_maxi;
	var parrent_size_large;
	var parrent_size_medium;
	var parrent_size_small;
	function get_size(dom){
		if(check_responsive!=true){
			normal_cell=dom.data('all');
			normal_cell=parseInt(normal_cell);
			normal_cell=fix_size(normal_cell);
		} else{
			maxi=dom.data('maxi');
			maxi=parseInt(maxi);
			large=dom.data('large');
			large=parseInt(large);
			medium=dom.data('medium');
			medium=parseInt(medium);
			small=dom.data('small');
			small=parseInt(small);
			maxi=fix_size(maxi);
			large=fix_size(large);
			medium=fix_size(medium);
			small=fix_size(small);
		}

		function fix_size(value){
			if((value>6)&&(value<12)){
				value=6;
			}
			return value;
		}
	}
	function clean_old_styles(dom){
		for (var i=1;i<=12;i++){
			dom.find('.'+target).removeClass('cell-'+i+'');
			dom.find('.'+target).removeClass('cell-'+i+'-deep');
			dom.find('.'+target).removeClass('cell-clear');
		}
	}
	function make_grid(dom){
		var maxi_row_cell;
		var large_row_cell;
		var medium_row_cell;
		var small_row_cell;
		var normal_row_cell;

		if(check_responsive!=true){
			if(check_deep!=true){
				normal_row_cell=12/normal_cell>>0;
			} else {
				parrent_size=dom.data("parentsize");
				parrent_size=parseInt(parrent_size);
				normal_row_cell=parrent_size/normal_cell>>0;
			}
			dom.each(function() {
				mark_cell($(this).find('.'+target), normal_row_cell, '');
				mark_clear($(this).find('.'+target+':nth-child('+normal_cell+'n)'), '');
			});
		} else{
			if(check_deep!=true){
				maxi_row_cell=12/maxi>>0;
				large_row_cell=12/large>>0;
				medium_row_cell=12/medium>>0;
				small_row_cell=12/small>>0;	
			} else {
				parrent_size_maxi=dom.data("parentsize-maxi");
				parrent_size_large=dom.data("parentsize-large");
				parrent_size_medium=dom.data("parentsize-medium");
				parrent_size_small=dom.data("parentsize-small");
				parrent_size_maxi=parseInt(parrent_size_maxi);
				parrent_size_large=parseInt(parrent_size_large);
				parrent_size_medium=parseInt(parrent_size_medium);
				parrent_size_small=parseInt(parrent_size_small);
				maxi_row_cell=parrent_size_maxi/maxi>>0;
				large_row_cell=parrent_size_large/large>>0;
				medium_row_cell=parrent_size_medium/medium>>0;
				small_row_cell=parrent_size_small/small>>0;	
			}

			dom.each(function() {
				mark_cell($(this).find('.'+target), maxi_row_cell, '-maxi');
				mark_cell($(this).find('.'+target), large_row_cell, '-large');
				mark_cell($(this).find('.'+target), medium_row_cell, '-medium');
				mark_cell($(this).find('.'+target), small_row_cell, '-small');
				mark_clear($(this).find('.'+target+':nth-child('+maxi+'n)'), '-maxi');
				mark_clear($(this).find('.'+target+':nth-child('+large+'n)'), '-large');
				mark_clear($(this).find('.'+target+':nth-child('+medium+'n)'), '-medium');
				mark_clear($(this).find('.'+target+':nth-child('+small+'n)'), '-small');
			});
		}


		function mark_cell(dom, cell, size){
			if(check_deep==true){
				dom.addClass('cell-'+cell+size+'-deep');
			} else {
				dom.addClass('cell-'+cell+size);
			}
		}
		function mark_clear(dom, size){
			dom.addClass('cell-clear'+size);
		}
	}
	$('.js_cell_helper').each(function() {
		check_responsive=$(this).data('responsive');
		check_galery=$(this).data('galery');
		target=$(this).data('target');
		check_deep=$(this).data('deep');
		get_size($(this));
		if(check_galery==true){
			clean_old_styles($(this).find('.js_galery_container'));
			make_grid($(this).find('.js_galery_container'));
		} else{
			clean_old_styles($(this));
			make_grid($(this));
		}
	});
});