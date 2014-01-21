Template.map.rendered = function() {
  var map = L.map('map', { zoomControl:false }).setView([42.3581, -71.0636], 16);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                   '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
  }).addTo(map);
};