Template.gamify.helpers({
  areBadges: function() {
    return Badges.find().count() > 0;
  }
});