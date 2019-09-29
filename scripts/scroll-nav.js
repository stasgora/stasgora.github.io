let currentScrollPos = 0;
let lastScrollPos = 0;
let updateRequested = false;
let nav, main, navButtons;

const pinned = 'nav-pinned';
const unpinned = 'nav-unpinned';

$(() => {
	nav = $('nav');
	main = $('main');

	// Block horizontal scrolling
	$(window).bind('scroll', () => {
		if ($(window).scrollLeft() !== 0)
			$(window).scrollLeft(0);
	});
	navButtons = [$('nav > div:first-child'), $('nav > div:last-child')];

	setTimeout(() => {
		$(window).bind('scroll', () => {
			currentScrollPos = window.pageYOffset;
			if (!updateRequested)
				requestAnimationFrame(update);
			updateRequested = true;
		});
	}, 1000);
	navButtons[0].click(() => onNavButtonPress(0));
	navButtons[1].click(() => onNavButtonPress(1));

	$(document).keydown(event => {
		if(event.which === 37)
			onNavButtonPress(0);
		else if(event.which === 39)
			onNavButtonPress(1);
	});
});

function onNavButtonPress(index) {
	main.css('transform', index === 0 ? 'none' : 'translateX(-50%)');
	navButtons[index].css('opacity', '0');
	setTimeout(() => navButtons[index].css('visibility', 'hidden'), 200);
	navButtons[(index + 1) % 2].css('opacity', '.5');
	navButtons[(index + 1) % 2].css('visibility', 'visible');
}

function update() {
	if (currentScrollPos < lastScrollPos && nav.hasClass(unpinned)) {
		nav.removeClass(unpinned);
		nav.addClass(pinned);
	} else if (currentScrollPos > lastScrollPos && (nav.hasClass(pinned) || !nav.hasClass(unpinned))) {
		nav.removeClass(pinned);
		nav.addClass(unpinned);
	}
	lastScrollPos = currentScrollPos;
	updateRequested = false;
}