Template.theFold.helpers({
  special: function() {
    return Session.get("isSpecial");
  }
});

Template.theFold.events({
  'click #special-link': function() {
    return Session.set("isSpecial", !Session.get("isSpecial"));
  }
});