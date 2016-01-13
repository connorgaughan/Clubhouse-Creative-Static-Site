// Append the counter span to each element
$('.portfolio-item').each(function(i) {
   $(this).append('<span class="portfolio-item--counter">' + (++i) + '</span>');
});

// Parallax those counters
$('.portfolio-item--counter').each(function(){
	var counter 						= $(this);

	$(window).scroll(function() {
		var windowScroll  		= $(window).scrollTop(),
				counterScrolled 	= windowScroll / 35,
				counterPosition 	= counterScrolled + '%';

		counter.css({ bottom: counterPosition });
	});
});

//Parallax homepage stuff
var intro								= $('.main-intro p'),
		headlineOne 				= $('.site-title-first'),
		headlineTwo 				= $('.site-title-second'),
		headlineThree 			= $('.site-title-third');

$(window).scroll(function() {
	var windowScroll  		= $(window).scrollTop(),
			introScrolled			= windowScroll / 15,
			headlineScrolled	= windowScroll / 70,
			introPosition 		= introScrolled,
			hOnePosition 			= 4 + headlineScrolled + 'vw',
			hTwoPosition 			= 12 - headlineScrolled + 'vw',
			hThreePosition 		= -2 + headlineScrolled + 'vw';

	if(introPosition <= 55){
		intro.css({ marginBottom: '-' + introPosition + '%' });
	} else {
		intro.css({ marginBottom: '-55%'});
	}
	headlineOne.css({ left: hOnePosition });
	headlineTwo.css({ left: hTwoPosition });
	headlineThree.css({ left: hThreePosition });
	console.log(introPosition);
});