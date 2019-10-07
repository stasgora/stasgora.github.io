const introKey = 'loading-intro';
const introPlayed = 'played';
let logo, logoBox;

$(() => {
	logoBox = $('#logo-box');
	logo = $('#logo-box > div:first-child');

	if(sessionStorage.getItem(introKey) !== introPlayed) {
		setTimeout(() => {
			$(logo).click(handleScroll);
		}, 2000);
	} else skipLoading();
});

function handleScroll() {
	finishLoading();
	sessionStorage.setItem(introKey, introPlayed);
	$(window).unbind('scroll', handleScroll);
}

function finishLoading() {
	preserveProperties(logo, ['width', 'transform']);
	//switch animations
	logo.removeClass('loading-anim');
	setTimeout(() => {
		const logoBox = $('#logo-box');
		logoBox.addClass('logo-box-pos');
		//divided to work in firefox
		$('body').addClass('loaded');
		setTimeout(() => {
			preserveProperties(logo, ['width']);
			logo.css('border-radius', '50%');

			logo.removeClass('loading-retract-anim');
			logo.addClass('loading-transition-anim');

			setTimeout(() => {
				extendLogoNav();
				logoBox.css('transition-property', 'none');
			}, 1000);
		}, 400);
	}, 1);
	sessionStorage.setItem(lastSubpageKey, '0')
}

function skipLoading() {
	let lastSubpage = sessionStorage.getItem(lastSubpageKey);
	if(lastSubpage !== null)
		setTimeout(() => changeSubpage(lastSubpage), 1);
	$('body').addClass('loaded');
	logoBox.addClass('logo-box-pos');
	logoBox.css('transition-property', 'none');
	logo.addClass('loading-transition-anim');
	logo.css('animation-duration', '0s');
	$('#loading-cover').css('transition', 'none');
	extendLogoNav();
}

function preserveProperties(element, properties) {
	properties.forEach(property => element.css(property, element.css(property)));
}

function extendLogoNav() {
	$('#logo-box > div:last-child').css('display', 'block');
	logo.click(() => logoBox.toggleClass(sectionNavExtendedClass));
}