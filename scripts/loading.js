$(() => {
	let introKey = 'loading-intro';
	let introPlayed = 'played';
	if(sessionStorage.getItem(introKey) !== introPlayed) {
		setTimeout(() => {
			$(window).bind('scroll', () => {
				finishLoading();
				sessionStorage.setItem(introKey, introPlayed);
				$(window).unbind('scroll');
			});
		}, 2000);
	} else skipLoading();
});

function finishLoading() {
	let logo = $('#logo-box > div');
	preserveProperties(logo, ['width', 'transform']);
	//switch animations
	logo.removeClass('loading-anim');
	setTimeout(() => {
		let logoBox = $('#logo-box');
		logoBox.addClass('logo-box-pos');
		//divided to work in firefox
		$('body').addClass('loaded');
		setTimeout(() => {
			preserveProperties(logo, ['width']);
			logo.css('border-radius', '50%');

			logo.removeClass('loading-retract-anim');
			logo.addClass('loading-transition-anim');

			setTimeout(() => logoBox.css('transition-property', 'none'), 1000);
		}, 400);
	}, 1);
}

function skipLoading() {
	let logo = $('#logo-box > div');
	let logoBox = $('#logo-box');
	$('body').addClass('loaded');
	logoBox.addClass('logo-box-pos');
	logoBox.css('transition-property', 'none');
	logo.addClass('loading-transition-anim');
	logo.css('animation-duration', '0s');
	$('#loading-cover').css('transition', 'none');
}

function preserveProperties(element, properties) {
	properties.forEach(property => element.css(property, element.css(property)));
}