if( Meteor.users.find().count() === 0 ) {
  Accounts.createUser({
    email: "origami@mit.edu",
    password: "muchwow"
  });
}