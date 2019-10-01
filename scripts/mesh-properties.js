$(() => {
	let properties = $('#mesh-properties');
	let checkboxes = properties.find('input[type=checkbox]');
	checkboxes.each((index, element) => handleMeshLayerVisibilitySwitch(element));
	checkboxes.change(event => {
		handleMeshLayerVisibilitySwitch(event.target);
	});
	let sliders = properties.find('input[type=range]');
	sliders.each((index, element) => handleMeshLayerOpacityChange(element));
	sliders.on('input', event => {
		handleMeshLayerOpacityChange(event.target);
	});
});

function handleMeshLayerVisibilitySwitch(checkbox) {
	getSvgByDataLink(checkbox).css('display', checkbox.checked ? 'block' : 'none');
}

function handleMeshLayerOpacityChange(slider) {
	getSvgByDataLink(slider).css('opacity', $(slider).val());
}

function getSvgByDataLink(element) {
	return $('#' + element.dataset.svgLink)
}