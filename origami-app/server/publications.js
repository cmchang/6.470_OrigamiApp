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