Package.describe({
  summary: "Leaflet.TileBuffer, a plugin to encourage Leaflet to load tiles beyond the viewport. https://github.com/olizilla/"
});

Package.on_use(function (api, where) {
  api.use(['leaflet'], 'client');

  api.add_files(['lib/L.TileBuffer.js'], 'client');

});