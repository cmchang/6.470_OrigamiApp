Meteor.publish("userTrips", function(){
	return Trips.find({});
});