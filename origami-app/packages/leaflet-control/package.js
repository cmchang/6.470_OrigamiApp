Package.describe({
  summary: "Leaflet Location Control bundled for Meteor. Original plugin Copyright (c) 2013 Dominik Moritz - https://github.com/domoritz/leaflet-locatecontrol"
});

Package.on_use(function (api, where) {
  api.use(['leaflet'], 'client');

  api.add_files(['lib/L.Control.Locate.js'], 'client');

});