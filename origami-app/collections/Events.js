Events = new Meteor.Collection("events");

Events.allow({
  insert: function(userId, doc) {
    return true;
  }
});