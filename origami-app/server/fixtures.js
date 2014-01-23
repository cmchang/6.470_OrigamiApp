if( Meteor.users.find().count() === 0 ) {

  var tempUserId = Accounts.createUser({
    email: "origami@mit.edu",
    password: "muchwow"
  });

    var crackTripId = Trips.insert({
      userId: tempUserId,
      timeOfDay: "evening",
      mood: 'romantic',
      energy: 'energetic',
      moreCrack: 'yes'
    });

       //
}