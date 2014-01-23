// Default Router configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return Meteor.subscribe('userTrips');
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
          energy: 'conversation'
        });
      }
    ]
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
    waitOn: function() {
      return [
        Meteor.subscribe("tripDetail", this.params._id ),
        Meteor.subscribe("tripEvents", this.params._id)
      ];
    },
    data: function() {
      return {
        trip: Trips.findOne(this.params._id),
        eventss: Events.find({tripId: this.params._id})
      };
    },
  });
});