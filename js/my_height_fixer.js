$(document).ready(function(){

	var window_H;
	var header_H;
	var footer_H;
	var height_fixer;


	function height_fix(){
		window_H=$('.window_H_checker').height();
		header_H=$('header').height();
		footer_H=$('footer').height();
		console.log("window_H = "+window_H);
		console.log("header_H = "+header_H);
		console.log("footer_H = "+footer_H);
		height_fixer=window_H-(header_H+footer_H);

		$('.height_fixer').css({"min-height":height_fixer+"px"});
	};
var check_first_load=false;
	window.onload = function(){ 
		check_first_load=true;
	    height_fix();
	};
	if(check_first_load==false){
	    height_fix();
	}
	

	$(window).on('resize', function(){
		height_fix();
	});


});