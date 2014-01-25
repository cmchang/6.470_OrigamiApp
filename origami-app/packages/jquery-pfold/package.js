Package.describe({
  summary: "PFold JQuery plugin packaged for Meteor"
});

Package.on_use(function (api, where) {
  api.use('jquery', 'client');
  api.use('templating', 'client');

  api.add_files(['css/pfold.css'], 'client');

  api.add_files(['lib/modernizr.custom.79639.js'], 'client');
  api.add_files(['lib/jquery.pfold.js'], 'client');

});