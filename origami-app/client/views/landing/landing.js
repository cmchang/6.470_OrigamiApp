var pfoldGeneration = function() {
	var foldProperties = [
		{
			cssVertical: "top",
			cssHorizontal: "left",
			folddirection: ["right", "bottom"]
		}
	];
};

Template.landing.rendered = function() {

	Meteor.setTimeout(function() {
		// Grab pfold container
		var $container = $( '.uc-container' );
		// Instantiate pfold object
		var pfold = $container.pfold({
			easing : 'ease-in-out',
			folds : 2,
			folddirection : ['right','bottom'],
			onEndUnfolding : function() {
				// Fold it back up
				Meteor.setTimeout(function() {
					pfold.fold();
				}, 4*1000);
			},
			onEndFolding : function() {
				// remove it
				$container.remove();
			}
		});
		// Unfold automatically
		pfold.unfold();
	}, 2*1000);
	
};