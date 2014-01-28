// Trip = {,
//   userId,
//   neighborhood,
//   time,
//   group,
//   energy,
//   name,
//   created
// };

Trips = new Meteor.Collection("trips");

// Declare permissions required
Trips.allow({
  insert: ownsDocument,
  update: ownsDocument,
  remove: ownsDocument
});

Trips.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'timeOfDay', 'mood', 'energy', 'moreCrack').length > 0);
  }
});

Meteor.methods({
  insertTrip: function( tripAttributes ) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to create new trips");

    // ensure the post has a title
    if ( !tripAttributes.city || !tripAttributes.neighborhood || !tripAttributes.time || !tripAttributes.group || !tripAttributes.energy )
      throw new Meteor.Error(422, 'You are missing key fields, please go back and fill those in');

    var adj, time, group;
    if( tripAttributes.energy == "energetic") {
      adj = "An energetic";
    } else if( tripAttributes.energy == "conversational") {
      adj = "A talkative";
    } else {
      adj = "A " + tripAttributes.energy;
    }
    if( tripAttributes.time == "all") {
      time = "day";
    } else {
      time = tripAttributes.time;
    }
    if( tripAttributes.group == "romantic") {
      group = "with a spark"
    } else if( tripAttributes.group == "alone") {
      group = "on your own"
    } else {
      group = "with " + tripAttributes.group
    }


    // pick out the whitelisted keys
    var trip = _.extend(_.pick(tripAttributes, 'city', 'neighborhood', 'time', 'group', 'energy'), {
      userId: user._id,
      name: adj + " " + time + " " + group,
      created: new Date().getTime(),
    });

    var tripId =  Trips.insert(trip);
  
    return tripId;
  },

  clearTrip: function( tripId ) {
    return Events.remove({tripId: tripId});
  }
});