$(document).ready(function(){
	// *************************open video
	var video_url;
	$('.js_open_video_key').on('click', function(){
		video_url=$(this).attr("popup");
		$('.big_video_container').append("<iframe class='big_video_iframe' src='"+video_url+"' frameborder='0' allowfullscreen></iframe>");
		$('.video_family').stop().fadeIn(300);
	});
	$('.video_shadow').on('click', function(){
		video_url="zzz";
		$('.big_video_iframe').attr("src", video_url);
		$('.big_video_container').clear;
		$('.video_family').stop().fadeOut(300);
	});
});