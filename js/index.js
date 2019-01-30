jQuery.noConflict();

jQuery(() => {
	jQuery('#gallery1').gallery({
		current: 2,
		classes: 'custom-gallery'
	});
	jQuery('#gallery2').gallery();
});