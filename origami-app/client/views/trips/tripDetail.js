Template.tripDetail.events({
  'click .re-roll-trip': function( e, template ) {
    e.preventDefault();

    var trip = template.data.trip;

    rollTrip(trip._id);
  }
});