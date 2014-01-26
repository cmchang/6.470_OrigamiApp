Trips = new Meteor.Collection("trips");

// Declare permissions required
// ex.
Trips.allow({
  insert: ownsDocument,
  update: ownsDocument,
  remove: ownsDocument
});

Trips.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'userId', 'timeOfDay', 'mood', 'energy', 'moreCrack').length > 0);
  }
});

Meteor.methods({
  insertTrip: function( timeOfDay, mood, energy ) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to create new trips");

    var trip = {
      userId: user._id,
      timeOfDay: timeOfDay,
      mood: mood,
      energy: energy,
      name: "A "+ mood + " " + timeOfDay +" for " + energy ,
      created: new Date().getTime()
    };

    var tripId =  Trips.insert(trip);
  
    return tripId;
  },

  clearTrip: function( tripId ) {
    return Events.remove({tripId: tripId});
  }
});