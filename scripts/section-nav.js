const sectionNavExtendedClass = 'section-nav-extended';
const targetDataElement = 'target-element';

function setupSectionNav() {
	let sectionNav = $('#section-nav');
	sectionNav.css('display', 'block');
	logo.click(() => {
		sectionNav.toggleClass(sectionNavExtendedClass);
		return false;
	});
	sectionNav.toggleClass(sectionNavExtendedClass);
	onSubPageChange(currentPage);
}

function onSubPageChange(index) {
	const sectionNav = $('#section-nav');
	let isExtended = sectionNav.hasClass(sectionNavExtendedClass);
	if(isExtended)
		sectionNav.removeClass(sectionNavExtendedClass);
	setTimeout(() => {
		sectionNav.empty();
		sectionNav.append(getNavElement("Top", $('main > section > h1')));
		let sections = $('main > section:nth-child(' + (index + 1) + ')').find('> section h3, > section h5');
		sections.each((ind, el) => sectionNav.append(getNavElement(el.dataset.navTitle, el)));

		sectionNav.children().click(event => handleNavElementClick(event.target));
		if(isExtended)
			setTimeout(() => sectionNav.addClass(sectionNavExtendedClass), 100)
	}, 800);
}

function handleNavElementClick(element) {
	const position = Math.min($($(element).data(targetDataElement)).offset().top, $(document).height() - $(window).height());
	let scrollEl = $('html');
	scrollEl.stop(true);
	scrollEl.animate({ scrollTop: position - $('#logo-box').height() }, 800,'swing');
}

function getNavElement(title, targetElement) {
	const el = $('<div title="' + title + '"></div>');
	el.data(targetDataElement, targetElement);
	return el;
}