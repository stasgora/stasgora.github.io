let currentScrollPos = 0;
let lastScrollPos = 0;
let updateRequested = false;
let header;

const pinned = 'header-pinned';
const unpinned = 'header-unpinned';

$(() => {
	header = $('header');
	setTimeout(() => {
		$(window).bind('scroll', () => {
			currentScrollPos = window.pageYOffset;
			if (!updateRequested)
				requestAnimationFrame(update);
			updateRequested = true;
		});
	}, 1000);
});

function update() {
	if (currentScrollPos < lastScrollPos && header.hasClass(unpinned)) {
		header.removeClass(unpinned);
		header.addClass(pinned);
	} else if (currentScrollPos > lastScrollPos && (header.hasClass(pinned) || !header.hasClass(unpinned))) {
		header.removeClass(pinned);
		header.addClass(unpinned);
	}
	lastScrollPos = currentScrollPos;
	updateRequested = false;
}