Template.map.rendered = function() {

  // Create map
  var map = L.map('map', { zoomControl:false });
  map.setView([42.3581, -71.0636], 14);


  // Add default OSM image tiles
  var openstreetmapURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      openstreetmapAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                   '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';

  var baseLayer = new L.TileLayer(openstreetmapURL, { attribution: openstreetmapAttr});
  map.addLayer(baseLayer);


  // Neighborhoods helpers

    // Default style for neighborhood polygon
    var defaultStyle = {
      fillColor: "#FFF",
      weight: 2,
      opacity: 1,
      color: '#000',
      dashArray: '3',
      fillOpacity: 0.7
    };

    // Default style for highlighted neighborhood polygon
    var highlightStyle = {
      fillColor: "#F00",
      weight: 3,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    };

    // Switch style depending on neighborhood name
    var style = function( feature ) {
      var name = feature.properties.label;
      var returnStyle = defaultStyle;

      if( name === "Downtown" ) {
        returnStyle.fillColor = "#F00";
      } else if ( name === "East Cambridge") {
        returnStyle.fillColor = "#0F0";
      } else {
        returnStyle.fillColor = "#FFF";
      }

      return returnStyle;
    };

    // mouseover handler
    var highlightFeature = function( e ) {
      var layer = e.target;

      layer.setStyle( highlightStyle );

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }
    };

    // mouseout handler
    var resetHighlight = function( e ) {
      var layer = e.target;
      layer.setStyle( style(layer.feature) );
    };

    // listener creation
    var onEachFeature = function( feature, layer ) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
      });
    };
  
  // Create neighborhoods layer
  var neighborhoodsLayer = L.geoJson(null, {
    style: style,
    onEachFeature: onEachFeature
  });
  neighborhoodsLayer.addTo(map);

  // Populate neighborhoods layer
  $.getJSON('json/boston.json', function (data) {
    neighborhoodsLayer.addData(data);
  });


  // $.getJSON('json/boston.json', function (data) {
  //   // var county_geojson = topojson.object(data, data.objects.counties),
  //   //     state_geojson = topojson.object(data, data.objects.states);
  //   neighborhoodsLayer.addData(data);
  //   // state_layer.addData(state_geojson);
  // });
};