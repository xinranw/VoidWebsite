(function(){
	$('dd').filter(':nth-child(n+2)').addClass('hide');
	$('dl').on('mousedown', 'dt', function(){
		$(this)
		.next()
		.slideDown(200)
		.siblings('dd')
		.slideUp(200);
	})
})();

function auto_run(){
  add_slider_effect;
  load_nav_button();
  highlight_nav_links();
}

function load_nav_button(){
  $(".nav-button").click(function () {
    $(".nav-button,.nav").toggleClass("open");
  });    
}

function highlight_nav_links(){
  function find_a(text){
    return $(this).text() === text;
  }

  var url = $(location).attr('href');
  var start = url.lastIndexOf('/') + 1;
  var linkName = url.substring(start);
  var link = $('a[href$="' + linkName + '"]');
  link.addClass("selected");
  link.parents(".dropdown").children('a[href$="#"]').addClass("selected")
}

function add_slider_effect(){
  $('#slider').nivoSlider({
    effect: 'fade',
    controlNav: false,
  })
}