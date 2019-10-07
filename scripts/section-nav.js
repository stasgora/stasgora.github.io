const sectionNavExtendedClass = 'section-nav-extended';

$(() => {
	const sectionNav = $('#section-nav');
});

function setupSectionNav() {
	let sectionNav = $('#section-nav');
	sectionNav.css('display', 'block');
	logo.click(() => {
		sectionNav.toggleClass(sectionNavExtendedClass);
		return false;
	});
	onSubPageChange(currentSubPage);
}

function onSubPageChange(index) {
	const sectionNav = $('#section-nav');
	sectionNav.removeClass(sectionNavExtendedClass);
	sectionNav.empty();
	sectionNav.append(getNavElement("Top"));
	let sections = $('main > section:nth-child(' + (index + 1) + ')').find('> section h3, > section h5');
	sections.each((ind, el) => sectionNav.append(getNavElement(el.dataset.navTitle)));
}

function getNavElement(title) {
	return '<div title="' + title + '"></div>';
}