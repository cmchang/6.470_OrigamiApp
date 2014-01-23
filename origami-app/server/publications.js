Meteor.publish("userTrips", function(){
	return Trips.find({userId: this.userId});
});