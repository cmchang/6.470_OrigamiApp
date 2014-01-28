// Event = {
//   tripId,
//   userId,
//   name,
//   location: {
//     address,
//     city,
//     latitude,
//     longitude,
//   },
//   phoneNo,
//   image,
//   rating: {
//     yelp,
//     user,
//     img
//   },
//   tripDetails: {
//     order,
//     time,
//   }
// };

Events = new Meteor.Collection("events");

Events.allow({
  insert: ownsDocument,
  update: ownsDocument,
  remove: ownsDocument
});



Meteor.methods({
  reRollEvent: function( eventId, event ) {
    var user = Meteor.user();
    var doc = Events.find(eventId);

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");

    // ensure the user owns the event
    if ( doc.userId !== user._id )
      throw new Meteor.Error(401, "You must own an event to re-roll it");

    // TODO stub - write actual update method
    console.log("Rerolling eventId: " + eventId + " with event:", event);
  }
});