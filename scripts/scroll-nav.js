let currentScrollPos = 0;
let lastScrollPos = 0;
let updateRequested = false;
let nav, main, navButtons;

const pinned = 'nav-pinned';
const unpinned = 'nav-unpinned';

const lastSubpageKey = 'last-subpage';
const subpageCount = 2;

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
	bindScrollEvents();
});

function bindScrollEvents() {
	//buttons
	navButtons[0].click(() => animateChangeSubpage(0));
	navButtons[1].click(() => animateChangeSubpage(1));
	//arrow keys
	$(document).keydown(event => {
		if(event.which === 37)
			animateChangeSubpage(0);
		else if(event.which === 39)
			animateChangeSubpage(1);
	});
	//swipes
	let hammer = new Hammer($('body').get(0), {touchAction: 'auto'});
	hammer.on('swipeleft', () => animateChangeSubpage(1));
	hammer.on('swiperight', () => animateChangeSubpage(0));
	hammer.get('swipe').set({threshold: 100});
	hammer.off('pinch');
}

function animateChangeSubpage(index) {
	index = parseInt(index);
	if(index >= subpageCount)
		return;
	main.css('transform', index === 0 ? 'none' : 'translateX(-50%)');
	changeNavButtons(index);
	sessionStorage.setItem(lastSubpageKey, index);
}

function changeSubpage(index) {
	index = parseInt(index);
	if (index >= subpageCount)
		return;
	main.removeClass('subpage-transition');
	main.css('transform', parseInt(index) === 0 ? 'none' : 'translateX(-50%)');
	setTimeout(() => {
		main.addClass('subpage-transition');
	}, 1);
	changeNavButtons(index);
}

function changeNavButtons(index) {
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