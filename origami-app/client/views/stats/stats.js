Template.stats.helpers({
  totalBadgeCount: function() {
    return Badges.find().count();
  },
  unlockedBadgeCount: function() {
    return Meteor.user().badges.length;
  },
  areBadges: function() {
    return Badges.find().count() > 0;
  }
});

Template.lockedBadge.events({
  'mouseover .badge-container' : function( e, template ) {
    $(template.find(".badge-container")).removeClass("badge-locked")
  },
  'mouseout .badge-container' : function( e, template ) {
    $(template.find(".badge-container")).addClass("badge-locked")
  }
});

Template.leader.helpers({
  leaderboardName: function() {
    return this.profile.name || this.emails[0].address;
  }
});