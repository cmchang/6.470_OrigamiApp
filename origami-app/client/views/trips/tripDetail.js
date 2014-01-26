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
  var markers = {};
  this.data.tripEvents.observeChanges({
    added: function( _id, fields ) {
      console.log("Added", fields);
      var loc = [fields.location.latitude, fields.location.longitude];
      markers[_id] = L.marker(loc, {
        _id: _id
      }).addTo(markersLayer);
    },
    removed: function( _id ) {
      window.markers.removeLayer(markers[_id]);
    }
  });
};

Template.tripDetail.destroyed = function() {
  window.markers.clearLayers();
};