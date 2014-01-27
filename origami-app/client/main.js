yelpQuery = function( terms, location, callback ) {
  var auth = {
    consumerKey: "gbGLJH2Q4TcZY44906xnJg",
    consumerSecret: "0DjD5ERK_Lcmqo8SsKSHP_XAPLs",
    accessToken: "mJy4uE-bc4qW6RssA4uTQsBQ4MXoUprG",
    accessTokenSecret: "MLmCs-SyuhaAM4S6wGlYktVrwYw",
    serviceProvider: {
      signatureMethod: "HMAC-SHA1"
    }
  };

  var near = !!location ? location : "Boston, MA";

  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };

  parameters = [];
  parameters.push(['term', terms]);
  parameters.push(['location', near]);
  parameters.push(['callback', 'cb']);
  parameters.push(['oauth_consumer_key', auth.consumerKey]);
  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  parameters.push(['oauth_token', auth.accessToken]);
  parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

  var message = {
    'action': 'http://api.yelp.com/v2/search',
    'method': 'GET',
    'parameters': parameters
  };

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);

  var parameterMap = OAuth.getParameterMap(message.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

  $.ajax({
    'url': message.action,
    'data': parameterMap,
    'cache': true,
    'dataType': 'jsonp',
    // 'jsonpCallback': 'cb',
    'success': function(data, textStats, XMLHttpRequest) {
      if(!!callback) {
        callback(data);
      } else {
        console.log("No Callback", data);
      }
    }
  });
};

rollTrip = function( tripId ) {
  var trip = Trips.findOne( tripId );

  var megaFun = {
    morning: {
        meal: {
            romantic: ["breakfast", "coffee", "cafe", "pancakes", "diner"],
            friends: ["breakfast", "coffee", "cafe", "pancakes", "diner"],
            family: ["breakfast", "coffee", "cafe", "pancakes", "diner"],
            alone: ["breakfast", "coffee", "cafe", "pancakes", "diner"]
        },
        activity: {
            romantic: ["park"],
            friends: ["park"],
            family: ["park"],
            alone: ["park", "library"]
        }
    },
    afternoon: {
        meal: {
            romantic: ["italian", "american", "japanese", "sandwiches"],
            friends: ["italian", "american", "japanese", "sandwiches"],
            family: ["italian", "american", "japanese", "sandwiches"],
            alone: ["italian", "american", "japanese", "sandwiches"]
        },
        activity: {
            romantic: ["wine tasting"],
            friends: ["wine tasting", "rock climbing", "kayaking", "sky zone", "shopping", "bike path"],
            family: ["museums", "movies", "historical","shopping", "bike path"],
            alone: ["library", "shopping", "bike path"]
        }
    },
    evening: {
        meal: {
            romantic: ["dinner"],
            friends: ["dinner"],
            family: ["dinner"],
            alone: ["dinner"]
        },
        dessert: {
            romantic: ["dessert", "ice cream", "froyo"],
            friends: ["dessert", "ice cream", "froyo"],
            family: ["dessert", "ice cream", "froyo"],
            alone: ["dessert", "ice cream", "froyo"]
        },
      activity: {
        romantic: ["movies", "ballet", "opera", "comedy", "theater", "music", "musical"],
        friends: ["movies", "ballet", "opera", "comedy", "theater", "music", "musical"],
        family: ["movies", "ballet", "opera", "comedy", "theater", "music", "musical"],
        alone: ["movies", "ballet", "opera", "comedy", "theater", "music", "musical"],
      }
    },
    night: {
      meal: {
        romantic: ["diner"],
        friends: ["diner"],
        family: ["diner"],
        alone: ["diner"],
      },
      activity: {
        romantic: ["movie"],
        friends: ["movies", "bar", "divebar", "club",],
        family: ["movie"],
        alone: ["bar", "divebas", "club"]
      }
    }
  };

  var queries = [];

  if( trip.timeOfDay == "morning" ) {
    queries.push(megaFun.morning.meal[trip.mood]);
    queries.push(megaFun.morning.activity[trip.mood]);
  } else if( trip.timeOfDay == "afternoon" ) {
    queries.push(megaFun.afternoon.meal[trip.mood]);
    queries.push(megaFun.afternoon.activity[trip.mood]);
    queries.push(megaFun.evening.dessert[trip.mood]);
    queries.push(megaFun.afternoon.activity[trip.mood]);
  } else if( trip.timeOfDay == "evening" ) {
    queries.push(megaFun.evening.meal[trip.mood]);
    queries.push(megaFun.evening.activity[trip.mood]);
    queries.push(megaFun.evening.dessert[trip.mood]);
  } else if( trip.timeOfDay == "night" ) {
    queries.push(megaFun.evening.dessert[trip.mood]);
    queries.push(megaFun.night.activity[trip.mood]);
    queries.push(megaFun.night.activity[trip.mood]);
    queries.push(megaFun.night.meal[trip.mood]);
  } else {
    queries.push(megaFun.morning.meal[trip.mood]);
    queries.push(megaFun.afternoon.activity[trip.mood]);
    queries.push(megaFun.afternoon.meal[trip.mood]);
    queries.push(megaFun.afternoon.activity[trip.mood]);
    queries.push(megaFun.evening.meal[trip.mood]);
    queries.push(megaFun.evening.activity[trip.mood]);
    queries.push(megaFun.evening.dessert[trip.mood]);
    queries.push(megaFun.night.activity[trip.mood]);
  }

  Meteor.call("clearTrip", tripId, function( error, result ) {
    console.log(queries);
    _.each(queries, function(queryGroup) {
      if( typeof queryGroup == 'string' ) {
        addEvent(tripId, queryGroup);
      } else if( queryGroup instanceof Array ) {
        var index = Math.floor(Math.random() * queryGroup.length);
        addEvent(tripId, queryGroup[index]);
      }
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

addEvent = function ( tripId, query ) {
  yelpQuery(query, "Boston, MA", function(data) {
    var num, business;
    do {
      num = Math.floor(Math.random() * data.businesses.length);
      business = data.businesses[num];
    }
    while (Events.find({tripId: tripId, yelpId: business.id}).count() > 0);
    var locationQuery = business.location.address[0] + " " +
                        business.location.city + " " +
                        business.location.postal_code;
    getLatLong( locationQuery, function( latitude, longitude ) {
      var newEvent = {
        tripId: tripId,
        yelpId: business.id,
        name: business.name,
        location: {
          address: business.location.address[0],
          city: business.location.city,
          latitude: latitude,
          longitude: longitude,
        },
        url: business.url,
        phoneNo: business.display_phone,
        image: business.image_url,
        rating: {
          yelp: "4.5",
          user: "",
          img: business.rating_img_url_small || "http://www.defaultimage.com/image.jpg" // TODO
        },
        tripDetails: {
          order: 1,
          time: "6:00",
        }
      };
      console.log(newEvent);
      Events.insert(newEvent);
    });
  });
};