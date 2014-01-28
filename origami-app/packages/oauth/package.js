Package.describe({
  summary: "OAuth bundled for Meteor"
});

Package.on_use(function (api, where) {

  api.add_files(['lib/sha1.js'], 'client');
  api.add_files(['lib/oauth.js'], 'client');

  if (api.export) {
    api.export('OAuth');
  }

});