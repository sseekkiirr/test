$(document).ready(function(){
	function make_grid(){
		$('#my_grid').html("");
		$('body').append("<div class='grid_fix_container'><div class='wrapper_for_all js_grid_fix_wrapper_for_all'></div></div>");
		var cell_w_lib=[];

		for(var i=1; i<=12; i++){
			$('.grid_fix_container').children('.wrapper_for_all').append("<div class='row fix_row_"+i+"'><div class='cell cell-"+i+" fix_cell-"+i+"-deep'></div><div></div></div>");
			cell_w_lib[i]=$('.fix_cell-'+i+'-deep')[0].getBoundingClientRect().width;
			cell_w_lib[i]=fix_cell_w(cell_w_lib[i]);
		}

		var dot_pos;
		var left_cell_part;
		var right_cell_part;
		function fix_cell_w(cell){
			cell=cell+"";
			dot_pos=cell.indexOf('.');
			if(dot_pos>0){
				left_cell_part=cell.substring(0,dot_pos);
				right_cell_part=cell.substring(dot_pos+1);
				var right_cell_part_w=right_cell_part.length;
				if(right_cell_part_w>4){
					right_cell_part=right_cell_part.substring(0,4);
				}
				cell=left_cell_part+"."+right_cell_part;
				cell=parseFloat(cell);
			}

			return cell;
		}

		var cell_margin=$('.fix_cell-1-deep').css("margin-right");

		var px_pos=cell_margin.indexOf('px');
		cell_margin=cell_margin.substring(0,px_pos);
		cell_margin=parseFloat(cell_margin);

		cell_margin=cell_margin+"px";
		var style_template="";
		function write_rulles(prefix, size, suffix){
			for(var i=1;i<=12;i++){
				style_template=style_template+"."+prefix+"-"+i+size+suffix+"{width:"+cell_w_lib[i]+"px; margin-right:"+cell_margin+"}\n";
			}
		}
		write_rulles("c", "", "-d");
		write_rulles("cell", "", "-deep");
		style_template=style_template+"@media only screen and (min-width: 1201px) and (max-width: 12000px){\n";
		write_rulles("cell", "-maxi", "-deep");
		write_rulles("c", "-ma", "-d");
		style_template=style_template+"}\n";
		style_template=style_template+"@media only screen and (min-width: 769px) and (max-width: 1200px){\n";
		write_rulles("cell", "-large", "-deep");
		write_rulles("c", "-l", "-d");
		style_template=style_template+"}\n";
		style_template=style_template+"@media only screen and (min-width: 481px) and (max-width: 768px){\n";
		write_rulles("cell", "-medium", "-deep");
		write_rulles("c", "-me", "-d");
		style_template=style_template+"}\n";
		style_template=style_template+"@media only screen and (min-width: 0px) and (max-width: 480px){\n";
		write_rulles("cell", "-small", "-deep");
		write_rulles("c", "-s", "-d");
		style_template=style_template+"}\n";
		$('style').append(style_template);
		$('.grid_fix_container').remove();
	}//end make_grid function

	make_grid();
	$(window).on('resize', function(){
		// console.log('resized');
		make_grid();
	});

});