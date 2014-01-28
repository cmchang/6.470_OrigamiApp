mapExists = false;
Template.map.rendered = function() {

  var neighborhoods = [];

  if(!mapExists) {

    // Create map
    window.map = L.map('map', { zoomControl:true });
    map.setView([42.3581, -71.0636], 14);
    var lc = L.control.locate().addTo(map);


    // Add default OSM image tiles
    // var mapTileURL = 'http://{s}.tile.cloudmade.com/4f8a96ea698c4630b8abdc34097f92e6/119638/256/{z}/{x}/{y}.png';    // Paid tiles
    var mapTileURL = 'http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png';  // Free option 1
    // var mapTileURL = 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png';           // Free option 2

    var baseLayer = new L.TileLayer(mapTileURL, {
      buffer: 4
    });
    map.addLayer(baseLayer);

    window.markersLayer = new L.LayerGroup().addTo(map);


    // Switch style depending on neighborhood name
    var style = function( feature ) {
      return {
        fillColor: "#FFF",
        fillOpacity: 0.6,
        weight: 2,
        opacity: 1,
        color: '#000',
        dashArray: '3',
      };
    };
    
    // Create neighborhoods layer
    var neighborhoodsLayer = L.geoJson(null, {
      style: style,
    });
    neighborhoodsLayer.addTo(map);

    // Populate Boston neighborhoods layer
    $.getJSON('/json/boston.json', function (data) {
      _.each(data.features, function(feature) {
          neighborhoodsLayer.addData(feature);
          neighborhoods.push(feature.properties.name);
      });
      neighborhoods.sort();
      Session.set("neighborhoods", neighborhoods);
    });

    // Populate Cambridge neighborhoods layer
    $.getJSON('/json/cambridge.json', function (data) {
      _.each(data.features, function(feature) {
          neighborhoodsLayer.addData(feature);
          neighborhoods.push(feature.properties.NAME);
      });
      neighborhoods.sort();
      Session.set("neighborhoods", neighborhoods);
    });

    mapExists = true;
  }
};