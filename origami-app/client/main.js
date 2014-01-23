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
    'jsonpCallback': 'cb',
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

  Meteor.call("clearTrip", tripId, function( error, result ) {
    yelpQuery("bars", "Boston, MA", function(data) {
      var num = Math.floor(Math.random() * data.businesses.length);
      var business = data.businesses[num];
      var newEvent = {
        tripId: trip._id,
        name: business.name,
        location: {
          address: business.location.address[0],
          // city: "Boston",
          // latitude: "",
          // longitude: "",
        },
        phoneNo: business.phoneNo,
        // image: "http://s3-media1.ak.yelpcdn.com/bphoto/85_HoifJk7HpvkoiDTQI4g/ms.jpg",
        rating: {
          yelp: "4.5",
          user: "",
        },
        tripDetails: {
          order: 1,
          time: "6:00",
        }
      };
      Events.insert(newEvent);
    });
  });

};