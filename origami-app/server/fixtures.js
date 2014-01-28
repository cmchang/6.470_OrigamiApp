var betaDebug = {
  clearUsers: function() {
    Meteor.users.remove({});
  },

  seedUsers: function() {
    return Accounts.createUser({
      email: "origami@mit.edu",
      password: "muchwow",
      profile: {
        name: null,
        imageURL: null,
        badges: null,
      }
    });
  },

  clearTrips: function() {
    Trips.remove({});
    Events.remove({});
  },

  seedTrip: function( seedUserId ) {
    var seedTripId = Trips.insert({
    userId: seedUserId,
    timeOfDay: "evening",
    mood: 'romantic',
    energy: 'energetic',
    moreCrack: 'yes',
    name: "Fixture Trip"
  });

    Events.insert({
      tripId: seedTripId,
      userId: seedUserId,
      name: "Sam LaGrassa's",
      location: {
        address: "44 Province St",
        city: "Boston",
        latitude: "",
        longitude: "",
      },
      phoneNo: "6173576861",
      image: "http://s3-media1.ak.yelpcdn.com/bphoto/85_HoifJk7HpvkoiDTQI4g/ms.jpg",
      rating: {
        yelp: "4.5",
        user: "",
      },
      tripDetails: {
        order: 1,
        time: "6:00",
      }
    });

    Events.insert({
      tripId: seedTripId,
      userId: seedUserId,
      name: "Coke Park/Whitey's",
      location: {
        address: "268 W Broadway",
        city: "Boston",
        latitude: "",
        longitude: "",
      },
      phoneNo: "6174644869",
      image: "http://s3-media1.ak.yelpcdn.com/bphoto/WARBbGlrukFcgcJbdNRY8Q/ms.jpg",
      rating: {
        yelp: "4.5",
        user: "",
      },
      tripDetails: {
        order: 1,
        time: "8:00",
      }
    });
  },

  clearBadges: function() {
    Badges.remove({});
  },

  seedAllBadges: function() {
    var pubOne = Badges.insert({
      name: "Hopeless Romantic",
      image: "/images/badges/image.png"
    });
    var pubTwo = Badges.insert({
      name: "Sushi Inamoratum",
      image: "/images/badges/image1.png"
    });

    Badges.insert({
      name: "Gorilla",
      image: "/images/badges/image2.png"
    });

    Badges.insert({
      name: "Tree Hugger",
      image: "/images/badges/image3.png"
    });
    
    // Badges.insert({
      // name: "Hopeless Romantic",
      // image: "/images/badges/image.png"
    // }),
          // {name: "Sushi Inamoratum", image: "/images/badges/image2.png"},
          // {name: "Gorilla", image: "/images/badges/image3.png"},
          // {name: "Lone Wolf", image: "/images/badges/image4.png"},
          // {name: "Family (Wo)Man", image: "/images/badges/image5.png"},
          // {name: "Mall Rat", image: "/images/badges/image6.png"},
          // {name: "Explorer", image: "/images/badges/image7.png"},
          // {name: "Super Trooper", image: "/images/badges/image8.png"},
          // {name: "Gregariuos Groupie", image: "/images/badges/image9.png"},

    return [pubOne, pubTwo];
  },

  seedUserBadges: function(userId, badges) {
    console.log(badges);
    Meteor.users.update(userId, {$set: {"profile.badges": badges}});
  }
};



Meteor.startup( function() {
  // Debugging functions. Should be switched off most of the time

  // betaDebug.clearUsers();
  // var betaUserId = betaDebug.seedUsers();
  // betaDebug.clearTrips();
  // betaDebug.seedTrip( betaUserId );
  // betaDebug.clearBadges();
  // var publicBadges = betaDebug.seedAllBadges();
  // betaDebug.seedUserBadges(betaUserId, publicBadges);

});