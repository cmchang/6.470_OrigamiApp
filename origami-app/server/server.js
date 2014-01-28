Meteor.methods({
  rollTrip: function( tripId ) {
    var user = Meteor.user();

    var trip = Trips.findOne( tripId );

    if( !user || !trip || trip.userId != user._id )
      return;
  }
});


Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  if( options.profile ) {
    user.profile = options.profile;
  } else {
    user.profile = {
      name: null,
      imageURL: null,
    };
  }
  user.points = _.random(0, 25);//options.profile ? options.profile.points : 0;

  return user;
});