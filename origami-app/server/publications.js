Meteor.publish("userTrips", function(){
	return Trips.find({});
});

Meteor.publish("tripDetail", function(tripId){
  return Trips.find({_id: tripId});
});

Meteor.publish("tripEvents", function(tripId){
  return Events.find({tripId: tripId});
});

Meteor.publish("allBadges", function() {
  return Badges.find({});
});

Meteor.publish("claimedBadges", function() {
  var user = Meteor.users.find(this.userId);
  return Badges.find({_id : { $in: user.profile.badges}});
});

Meteor.publish("unclaimedBadges", function() {
  var user = Meteor.users.find(this.userId);
  return Badges.find({_id : { $nin: user.profile.badges}});
});

Meteor.publish("leaderboard", function() {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1, points: 1}});
});