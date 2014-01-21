// Default Router configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
});

// Router filters
var filters = {

};

// Router path declarations
Router.map(function() {
  this.route('landing', {
    path: '/',
    template: 'landing'
  });
});