// Default Router configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [
      Meteor.subscribe('userTrips'),
    ];
  },
});

// Router filters
var filters = {
  requireAuthentication: function(){
    if (!Meteor.user()) {
      // render the login template but keep the url in the browser the same
      this.render('logIn');
      // stop the rest of the before hooks and the action function 
      this.stop();
    }
  },

  skipIfLoggedIn: function() {
    if( Meteor.user() ) {
      this.redirect( 'theFold' );
    }
  }
};

// Router path declarations
Router.map(function() {
  this.route('landing', {
    path: '/',
    template: 'landing',
    before: filters.skipIfLoggedIn
  });

  this.route('signUp', {
    path: '/sign-up',
    template: 'signUp',
    before: filters.skipIfLoggedIn
  });

  this.route('logIn', {
    path: '/log-in',
    template: 'logIn',
    before: filters.skipIfLoggedIn
  });

  this.route('logOut', {
    path: '/log-out',
    template: 'logOut',
    before: function() {
      Meteor.logout();
    }
  });

  this.route('theFold', {
    path: '/the-fold',
    template: 'theFold',
    before: [
      filters.requireAuthentication,
      function() {
        Session.set("currentTrip", {
          time: "evening",
          type: 'friends',
          energy: 'conversation',
          neighborhood: 'Area 2/MIT'
        });
      }
    ]
  });

  this.route('myProfile', {
    path: '/profile',
    template: 'profile',
    before: filters.requireAuthentication
  });

  this.route('myTrips', {
    path: '/my-trips',
    template: 'myTrips',
    before: filters.requireAuthentication,
    data : function() {
      return {
        trips: Trips.find({})
      };
    }
  });

  this.route('tripDetail', {
    path: '/trip/:_id',
    template: 'tripDetail',
    before: filters.requireAuthentication,
    waitOn: function() {
      return [
        Meteor.subscribe("tripDetail", this.params._id ),
        Meteor.subscribe("tripEvents", this.params._id)
      ];
    },
    data: function() {
      return {
        trip: Trips.findOne(this.params._id),
        tripEvents: Events.find({tripId: this.params._id})
      };
    },
  });

  this.route('gamify', {
    path: '/gamify',
    template: 'gamify',
    before: filters.requireAuthentication,
    waitOn: function() {
      return Meteor.subscribe("allBadges");
    },
    data : function() {
      return {
        allBadges: Badges.find(),
        claimedBadges: Badges.find({_id : { $in: Meteor.user().profile.badges}}),
        unclaimedBadges: Badges.find({_id : { $nin: Meteor.user().profile.badges}}),
        trips: Trips.find({})

        // allBadges: [
        //   {name: "Hopeless Romantic", image: "/images/badges/image.png"},
        //   {name: "Sushi Inamoratum", image: "/images/badges/image2.png"},
        //   {name: "Gorilla", image: "/images/badges/image3.png"},
        //   {name: "Lone Wolf", image: "/images/badges/image4.png"},
        //   {name: "Family (Wo)Man", image: "/images/badges/image5.png"},
        //   {name: "Mall Rat", image: "/images/badges/image6.png"},
        //   {name: "Explorer", image: "/images/badges/image7.png"},
        //   {name: "Super Trooper", image: "/images/badges/image8.png"},
        //   {name: "Gregariuos Groupie", image: "/images/badges/image9.png"},
        //   {name: "Polarbear Club", image: "/images/badges/image.png"},
        //   {name: "Tree Hugger", image: "/images/badges/image1.png"},
        //   {name: "Burger Bum", image: "/images/badges/image2.png"}

        // ],
        // badges: Meteor.user().badges,
      };
    }
  });

});