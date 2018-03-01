$(document).ready(function(){
	var html_template="<div class='js_video_shadow js_video_family'></div><div class='js_video_zone js_video_family'><iframe src='' frameborder='0'></iframe></div>";
	var video_url="";
	var fade_speed=300;
	$('.js_video_prev').on('click', function(){
		video_url=$(this).data("url");
		$('body').append(html_template);
		$('.js_video_zone').children('iframe').attr("src", video_url);
		$('.js_video_family').fadeIn(fade_speed);
		$('.js_video_shadow').bind('click', function(){
		$('.js_video_family').remove();
	});
	});
});



