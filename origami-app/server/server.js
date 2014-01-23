Meteor.methods({
  rollTrip: function( tripId ) {
    var user = Meteor.user();

    var trip = Trips.findOne( tripId );

    if( !user || !trip || trip.userId != user._id )
      return;
  }
});