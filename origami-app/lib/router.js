// Default Router configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
});

// Router filters
var filters = {
  requireAuthentication: function() {
    if (! Meteor.user()) {
      this.redirect( 'logIn' );
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

  this.route('theFold', {
    path: '/the-fold',
    template: 'theFold',
    before: filters.requireAuthentication
  });
});