$(() => {
	let checkboxes = $('#mesh-properties').find('input[type=checkbox]');
	checkboxes.each((index, element) => handleMeshLayerVisibilitySwitch(element));
	checkboxes.change(event => {
		handleMeshLayerVisibilitySwitch(event.target);
	});
});

function handleMeshLayerVisibilitySwitch(checkbox) {
	$('#' + checkbox.dataset.svgLink).css('display', checkbox.checked ? 'block' : 'none');
}