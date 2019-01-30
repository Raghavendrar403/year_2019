$(document).ready(function(){
   $(".toggle-menu").click(function(){
		$('.menu ul').toggleClass('active');							
	});
   $(".tablink").click(function(){
		$('.tabcontent,.tablink').removeClass('active');
		$(this).addClass('active');
		$('#'+$(this).attr('rel')).addClass('active');
	});
   /*$( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60
   });*/
   /*new Dragdealer('slider-vertical', {
    horizontal: false,
    vertical: true,
    
  });*/

});
