Template.origamiErrors.helpers({
  errors: function() {
    return OrigamiErrors.collection.find();
  }
});

Template.origamiError.rendered = function() {
  var error = this.data;
  Meteor.defer(function() {
    OrigamiErrors.collection.update(error._id, {$set: {seen: true}});
  });
};

Template.origamiError.events({
  'click button': function( e, template ) {
    $(template.firstNode).hide();
  }
});