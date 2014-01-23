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
    if( !!timeOfDay && !!mood && !!energy ) {
      Trips.insert({
        userId: this.userId,
        timeOfDay: timeOfDay,
        mood: mood,
        energy: energy,
        moreCrack: "yes"
      });
    }
  }
});