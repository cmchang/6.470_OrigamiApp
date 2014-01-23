if( Meteor.users.find().count() === 0 ) {
  var tempUserId = Accounts.createUser({
    email: "origami@mit.edu",
    password: "muchwow"
  });

  Trips.insert({
  	userId: tempUserId,
  	name: "trip 1",
  	params: {}
  });
}