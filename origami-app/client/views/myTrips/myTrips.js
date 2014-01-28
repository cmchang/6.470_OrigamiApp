Template.myTrips.helpers({
  showTrips: function() {
    return Trips.find({}).count() > 0;
  }
});