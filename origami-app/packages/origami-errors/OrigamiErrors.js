OrigamiErrors = {
  // Local (client-only) collection
  collection: new Meteor.Collection(null),

  throw: function(message) {
    OrigamiErrors.collection.insert({message: message, seen: false});
  },
  clearSeen: function() {
    OrigamiErrors.collection.remove({seen: true});
  },
  hasErrors: function() {
    return OrigamiErrors.collection.find().count() > 0;
  }
};

