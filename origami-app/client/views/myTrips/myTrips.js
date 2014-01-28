Template.myTrips.helpers({
  showTrips: function() {
    return Trips.find({}).count() > 0;
  }
});

Template.myTrips.events({
	'mouseover .tripContainer': function(e) {
		var tripDetail = e.target;
		while (tripDetail.className != "tripContainer"){
			tripDetail = tripDetail.parentNode;
		}
		// $(tripDetail.childNodes[1]).css("font-weight","600")
		$(tripDetail.childNodes[3]).show();
	},
	'mouseout .tripContainer': function(e) {
		var tripDetail = e.target;
		while(tripDetail.className != "tripContainer"){
			tripDetail = tripDetail.parentNode;
		}
		// $(tripDetail.childNodes[1]).css("font-weight","300")
		$(tripDetail.childNodes[3]).hide();
	},
	'click .tripRmv' : function( e, template ) {
		var tripId = this._id;
		Trips.remove( tripId );
		Meteor.call( "clearTrip", tripId );
	}
});