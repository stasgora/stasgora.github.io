const introKey = 'loading-intro';
const introPlayed = 'played';
let logo, logoBox;

$(() => {
	logoBox = $('#logo-box');
	logo = $('#logo-box > div:first-child');

	if(sessionStorage.getItem(introKey) !== introPlayed && getURLHash() === null) {
		setTimeout(() => {
			$(logo).click(enterSite);
		}, 1800);
	} else skipLoading();
});

function enterSite() {
	finishLoading();
	sessionStorage.setItem(introKey, introPlayed);
	$(logo).unbind('click', enterSite);
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
				setupSectionNav();

				logoBox.css('transition-property', 'none');
			}, 1000);
		}, 400);
	}, 1);
	sessionStorage.setItem(lastSubpageKey, '0')
}

function skipLoading() {
	let subpage = getURLHash();
	if(subpage === null)
		subpage = sessionStorage.getItem(lastSubpageKey);
	if(subpage !== null)
		setTimeout(() => changeSubpage(subpage, false), 1);
	$('body').addClass('loaded');
	logoBox.addClass('logo-box-pos');
	logoBox.css('transition-property', 'none');
	logo.addClass('loading-transition-anim');
	logo.css('animation-duration', '0s');
	$('#loading-cover').css('transition', 'none');
	setupSectionNav();
}

function preserveProperties(element, properties) {
	properties.forEach(property => element.css(property, element.css(property)));
}
