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

Meteor.publish("leaderboard", function() {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1, badges: 1, points: 1}});
});


Meteor.publish("dining", function() {
  return Dining.find({});
});

Meteor.publish("dessert", function() {
  return Dessert.find({});
});

Meteor.publish("activities", function() {
  return Activities.find({});
});