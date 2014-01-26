Template.tripDetail.events({
  'click .re-roll-trip': function( e, template ) {
    e.preventDefault();

    var trip = template.data.trip;
    console.log(trip);

    rollTrip(trip._id);
  },

  'click .add-event-link': function( e, template ) {
    e.preventDefault();

    var trip = template.data.trip;

    addEvent(trip._id, "dessert");
  }
});

Template.tripDetail.rendered = function() {
  var map = $("#map");
  this.data.tripEvents.observeChanges({
    added: function( id, fields ) {
      var loc = [fields.location.latitude, fields.location.longitude];
      L.marker(loc).addTo(window.map);
    }
  });
};

Template.tripDetail.destroyed = function() {
  // clear all markers
};