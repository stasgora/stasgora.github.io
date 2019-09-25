$(() => {
	$('body').keypress(event => {
		if (event.which === 'l'.charCodeAt(0))
			finishLoading();
	});
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

function preserveProperties(element, properties) {
	properties.forEach(property => element.css(property, element.css(property)));
}