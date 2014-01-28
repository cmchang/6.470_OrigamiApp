// var foldProperties = [
// 	{
// 		cssVertical: "top",
// 		cssHorizontal: "left",
// 		folddirection: [["right", "bottom"], ["bottom", "right"]]
// 	},
// 	{
// 		cssVertical: "top",
// 		cssHorizontal: "right",
// 		folddirection: [["left", "bottom"], ["bottom", "left"]]
// 	},
// 	{
// 		cssVertical: "bottom",
// 		cssHorizontal: "right",
// 		folddirection: [["left", "top"], ["top", "left"]]
// 	},
// 	{
// 		cssVertical: "bottom",
// 		cssHorizontal: "left",
// 		folddirection: [["right", "top"], ["top", "right"]]
// 	}
// ];

// window.pfoldTimeout = -1;

// var pfoldGeneration = function() {

// 	var $pfoldObject = $('<div class="pfold-container"></div>'),
// 			$ucContainer = $('<div class="uc-container"></div>').appendTo($pfoldObject),
// 			$initialContent = $('<div class="uc-initial-content"></div>').appendTo($ucContainer),
// 			$finalContent = $('<div class="uc-final-content"></div>').appendTo($ucContainer);

// 	var foldCSS = foldProperties[Math.floor(Math.random() * 3)];
// 	$pfoldObject.css(foldCSS.cssVertical, _.random(20, 250) + "px");
// 	$pfoldObject.css(foldCSS.cssHorizontal, _.random(20, 250) + "px");

// 	// Set content of divs
// 	$initialContent.append('<img src="/images/thumbs-1.jpg" alt="image01" />');
// 	$finalContent.append('<img src="/images/large-1.jpg" alt="image01-large" />');

// 	$pfoldObject.prependTo('body');

// 	var pfold = $ucContainer.pfold({
// 		easing : 'ease-in-out',
// 		folds : 2,
// 		folddirection: foldCSS.folddirection[_.random(1)],
// 		centered : false,
// 		// Timeout to fold it back up
// 		onEndUnfolding: function() {
// 			Meteor.setTimeout(function() {
// 				pfold.fold();
// 			}, _.random(4, 8)*1000);
// 		},
// 		// Remove it once it's been folded back up.
// 		onEndFolding: function() {
// 			$pfoldObject.remove();
// 			window.pfoldTimeout = Meteor.setTimeout(pfoldGeneration, _.random(4,10)*1000);
// 			console.log("reset with to ", pfoldTimeout);
// 		}
// 	});

// 	Meteor.setTimeout(function(){
// 		pfold.unfold();
// 	}, 800);
// };

// Template.landing.rendered = function() {

// 	window.pfoldTimeout = Meteor.setTimeout(pfoldGeneration, 2*1000);
	
// };

// Template.landing.destroyed = function() {
// 	console.log("unloading", pfoldTimeout);
// 	Meteor.clearTimeout(window.pfoldTimeout);
// };