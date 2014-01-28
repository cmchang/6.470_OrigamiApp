Template.gamify.helpers({
  areBadges: function() {
    return Badges.find().count() > 0;
  }
});

Template.gamify.events({
	'mouseover .badge': function( e, template ) {
		$(e.target.parentNode.childNodes[3]).show();
	},
	'mouseout .badge':function(e, templage){
		$(e.target.parentNode.childNodes[3]).hide();
	}

});