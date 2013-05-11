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