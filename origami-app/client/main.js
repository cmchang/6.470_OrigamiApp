tripSequence = {
  morning: ["morning:meal", "morning:activity"],
  afternoon: ["afternoon:meal", "afternoon:activity", "afternoon:dessert", "afternoon:activity"],
  evening: ["evening:meal", "evening:activity", "evening:dessert"],
  night: ["night:dessert", "night:activity", "night:activity", "night:meal"],
  all: ["morning:meal", "afternoon:activity", "afternoon:meal", "afternoon:activity", "evening:meal", "evening:activity", "evening:dessert", "night:activity"],
}

rollTrip = function( tripId ) {
  var trip = Trips.findOne( tripId );
  var city = Meteor.user().profile.city || "Boston, MA";
  var neighborhood = trip.neighborhood + ", " + city;

  var queries = [];

  Meteor.call("clearTrip", tripId, function() {
    var sequence = tripSequence[trip.time];
    _.each(sequence, function( tripEvent, index ) {
      var timeActivity = tripEvent.split(":"),
          query = "";
      do {
        query = generateSearchTerm(timeActivity[1], timeActivity[0], trip.group, trip.energy);
      } while( _.indexOf(queries, query) > -1 );
      queries.push(query);
      findUniqueEvent( tripId, query, neighborhood, index);
    });
  });
};

getLatLong = function( address, callback ) {
  callback = callback || function() {};
  // Basic input sanitization
  var query = address.replace( " ", "+" ).replace("&", "");
  // Google API lookup
  $.ajax({
    url: "//maps.googleapis.com/maps/api/geocode/json?address=" + query + "&sensor=false",
    success: function( data ) {
      if( data.results.length > 0 ) {
        var loc = data.results[0].geometry.location;
        callback( loc.lat, loc.lng );
      }
    }
  });
};


addUniqueEvent = function( tripId, business, index ) {
  var locationQuery = business.name + ", " +
                      business.location.address[0] + ", " +
                      business.location.city + ", " +
                      business.location.postal_code;

  getLatLong( locationQuery, function( latitude, longitude ) {
    var newEvent = {
      userId: Meteor.userId(),
      tripId: tripId,
      yelpId: business.id,
      name: business.name,
      order: index,
      location: {
        address: business.location.address[0],
        city: business.location.city,
        latitude: latitude,
        longitude: longitude,
      },
      url: business.url,
      phoneNo: business.display_phone,
      image: business.image_url || "/images/noBusiness.jpg",
      rating: {
        yelp: "4.5",
        user: "",
        img: business.rating_img_url_small
      },
      // TODO - add actual times to these things
      // tripDetails: {
      //   order: 1,
      //   time: "6:00",
      // }
    };
    Events.insert(newEvent);
  });
};



findUniqueEvent = function ( tripId, query, neighborhood, index ) {

  var yelpCallback = function(data, query, neighborhood, offset) {
    var business;
    for( var i = 0; i < data.businesses.length; i++ ) {
      business = data.businesses[i];
      if ( Events.find({userId: Meteor.userId(), yelpId: business.id} ).count() === 0 ) {
        return addUniqueEvent(tripId, business, index);
      }
    }
    if( i == 20) {
      yelpQuery( query, neighborhood, yelpCallback, offset + 20);
    } else {
      console.log("We have exhausted the Yelps. Wut now?");
    }
  }

  yelpQuery(query, neighborhood, yelpCallback);

};