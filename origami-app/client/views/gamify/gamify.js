Template.gamify.helpers({
  areBadges: function() {
    return Badges.find().count() > 0;
  }
});

Template.leader.helpers({
  leaderboardName: function() {
    return this.profile.name || this.emails[0].address;
  }
});