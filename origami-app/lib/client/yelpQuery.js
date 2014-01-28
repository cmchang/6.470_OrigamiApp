yelpQuery = function( query, location, callback, offset ) {
  callback = callback || function() {};
  offset = offset || 0;
  var auth = {
    consumerKey: "gbGLJH2Q4TcZY44906xnJg",
    consumerSecret: "0DjD5ERK_Lcmqo8SsKSHP_XAPLs",
    accessToken: "mJy4uE-bc4qW6RssA4uTQsBQ4MXoUprG",
    accessTokenSecret: "MLmCs-SyuhaAM4S6wGlYktVrwYw",
    serviceProvider: {
      signatureMethod: "HMAC-SHA1"
    }
  };

  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };

  parameters = [];
  parameters.push(['term', query]);
  parameters.push(['offset', offset]);
  parameters.push(['location', location]);
  parameters.push(['sort', 1]);
  parameters.push(['radius_filter', 4000]);
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
      callback( data, query, location, offset );
    }
  });
};