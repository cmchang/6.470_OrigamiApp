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