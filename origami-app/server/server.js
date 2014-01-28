Meteor.methods({
  rollTrip: function( tripId ) {
    var user = Meteor.user();

    var trip = Trips.findOne( tripId );

    if( !user || !trip || trip.userId != user._id )
      return;
  }
});


// Validate full name
Accounts.validateNewUser(function (user) {
  if (user.profile && user.profile.name && user.profile.name.length >= 5)
    return true;
  throw new Meteor.Error(403, "Full name must have at least 5 characters");
});

// Validate city
Accounts.validateNewUser(function (user) {
  if (user.profile && user.profile.city)
    return true;
  throw new Meteor.Error(403, "You must provide a home city");
});


Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  user.profile = {
    name: null,
    imageURL: null,
    city: "Boston, MA"
  }
  if( options.profile ) {
    _.extend(user.profile, options.profile);
  }
  user.points = 0;
  user.badges = [];

  return user;
});