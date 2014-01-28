Template.gamify.helpers({
  areBadges: function() {
    return Badges.find().count() > 0;
  }
});

tempOpacity = "";
Template.gamify.events({
	'mouseover .badge': function( e, template ) {
		$(e.target.parentNode.childNodes[3]).show();
		tempOpacity = $(e.target.parentNode.childNodes[1]).css("opacity");
		$(e.target.parentNode.childNodes[1]).css("opacity", "1");
	},
	'mouseout .badge':function(e, templage){
		$(e.target.parentNode.childNodes[3]).hide();
		$(e.target.parentNode.childNodes[1]).css("opacity", tempOpacity);
	}
});
Template.leader.helpers({
  leaderboardName: function() {
    return this.profile.name || this.emails[0].address;
  }
});