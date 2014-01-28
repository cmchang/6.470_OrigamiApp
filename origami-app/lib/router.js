// Default Router configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [
      Meteor.subscribe('userTrips'),
      Meteor.subscribe('dining'),
      Meteor.subscribe('dessert'),
      Meteor.subscribe('activities'),
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

  this.route('about');

  this.route('theFold', {
    path: '/the-fold',
    template: 'theFold',
    before: [
      filters.requireAuthentication,
      function() {
        Session.set("currentTrip", {
          time: "evening",
          group: 'friends',
          energy: 'conversation',
          neighborhood: 'Area 2/MIT',
          city: "cambridge"
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
    before: [
      filters.requireAuthentication,
      function() {
        if( Trips.find({_id: this.params._id}).count() === 0 ) {
          this.render('notFound');
          this.stop();
        }
      }
    ],
    waitOn: function() {
      return [
        Meteor.subscribe("tripDetail", this.params._id ),
        Meteor.subscribe("tripEvents", this.params._id)
      ];
    },
    data: function() {
      return {
        trip: Trips.findOne(this.params._id),
        tripEvents: Events.find({tripId: this.params._id}, {sort: {order: 1}})
      };
    },
  });

  this.route('stats', {
    path: '/stats',
    template: 'stats',
    before: filters.requireAuthentication,
    waitOn: function() {
      return [
        Meteor.subscribe("allBadges"),
        Meteor.subscribe("leaderboard")
      ];
    },
    data : function() {
      return {
        leaders: Meteor.users.find({}, {sort: {points: -1}}),
        // unlockedBadges: Badges.find({_id : { $in: Meteor.user().badges}}),
        lockedBadges: Badges.find({_id : { $nin: Meteor.user().badges}}),
        trips: Trips.find({})
      };
    }
  });

});