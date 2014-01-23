configureAccounts = function() {
  Accounts.loginServiceConfiguration.remove({service: "yelp"});

  // var yelp = Npm.require("yelp");
  // var yelpInstance = new yelp();
  // yelpInstance.createClient({
  //   consumer_key: "gbGLJH2Q4TcZY44906xnJg",
  //   consumer_secret: "0DjD5ERK_Lcmqo8SsKSHP_XAPLs",
  //   token: "bc4qW6RssA4uTQsBQ4MXoUprG",
  //   token_secret: "SyuhaAM4S6wGlYktVrwYw"
  // });

  // Accounts.loginServiceConfiguration.insert({
  //   service: "yelp",
  //   consumerKey: "gbGLJH2Q4TcZY44906xnJg",
  //   consumerSecret: "0DjD5ERK_Lcmqo8SsKSHP_XAPLs",
  //   accessToken: "bc4qW6RssA4uTQsBQ4MXoUprG",
  //   accessTokenSecret: "SyuhaAM4S6wGlYktVrwYw"
  // });
};