let currentScrollPos = 0;
let lastScrollPos = 0;
let updateRequested = false;
let nav, main, navButtons;

const pinned = 'nav-pinned';
const unpinned = 'nav-unpinned';

const lastSubpageKey = 'last-subpage';
const subPageLabel = 'sub-page';
let currentPage = 1;

const Page = Object.freeze({
	MeshEditor: 0,
	Experience: 1,
	WikiGraph: 2
});
const PageCount = Object.keys(Page).length;

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
	changeNavButtons(currentPage);
});

function getURLHash() {
	if(window.location.hash) {
		const subPage = window.location.hash.substring(1);
		if(subPage in Page)
			return Page[subPage];
	}
	return null;
}

function bindScrollEvents() {
	//buttons
	navButtons[0].click(() => changeSubpage(currentPage - 1));
	navButtons[1].click(() => changeSubpage(currentPage + 1));
	//arrow keys
	$(document).keydown(event => {
		if(event.which === 37)
			changeSubpage(currentPage - 1);
		else if(event.which === 39)
			changeSubpage(currentPage + 1);
	});
	//swipes
	delete Hammer.defaults.cssProps.userSelect;
	let hammer = new Hammer($('body').get(0), {
		touchAction: 'auto',
		inputClass: Hammer.TouchInput
	});
	hammer.on('swipeleft', () => changeSubpage(currentPage + 1));
	hammer.on('swiperight', () => changeSubpage(currentPage - 1));
	hammer.get('swipe').set({threshold: 100});
	hammer.off('pinch');
}

function changeSubpage(index, animate=true) {
	index = parseInt(index);
	if (!subPageIndexValid(index))
		return;
	const translation = index / PageCount * 100;
	if(!animate) {
		main.removeClass('subpage-transition');
		setTimeout(() => {
			main.css('transform', 'translateX(-' + translation + '%)');
			$('html').scrollTop();
			setTimeout(() => {
				main.addClass('subpage-transition');
			}, 10);
		}, 10);
	} else {
		main.css('transform', 'translateX(-' + translation + '%)');
		setTimeout(() => $('html').animate({ scrollTop: 0 }, 800), 800);
	}
	changeNavButtons(index);
	sessionStorage.setItem(lastSubpageKey, index);
	onSubPageChange(index);
}

function subPageIndexValid(index) {
	const valid = index !== currentPage && index >= 0 && index < PageCount;
	if(valid)
		currentPage = index;
	return valid;
}

function changeNavButtons(index) {
	const setName = (num, page) => navButtons[num].find('span').text(main.children().eq(page).data(subPageLabel));
	const setVisibility = (num, visible) => {
		navButtons[num].css('opacity', visible ? '.5' : '0');
		visible ? navButtons[num].css('visibility', 'visible') : setTimeout(() => navButtons[num].css('visibility', 'hidden'), 200);
	};
	setVisibility(0, index > 0);
	setVisibility(1, index < PageCount - 1);
	if(index > 0)
		setName(0, index - 1);
	if(index < PageCount - 1)
		setName(1, index + 1);
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