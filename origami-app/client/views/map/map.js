mapExists = false;
Template.map.rendered = function() {
  // console.log("map template rendered");

  if(!mapExists) {

    // console.log("map instantiated");

    // Create map
    var map = L.map('map', { zoomControl:true });
    map.setView([42.3581, -71.0636], 14);
    // var lc = L.control.locate().addTo(map);
    // map.on('dragstart', lc.stopFollowing);


    // Add default OSM image tiles
    var cloudmadeURL = 'http://{s}.tile.cloudmade.com/4f8a96ea698c4630b8abdc34097f92e6/119638/256/{z}/{x}/{y}.png';

    var baseLayer = new L.TileLayer(cloudmadeURL, {
      buffer: 8
    });
    map.addLayer(baseLayer);

    // Add a fake GeoJSON line to coerce Leaflet into creating the <svg> tag that d3_geoJson needs
    new L.geoJson({"type": "LineString","coordinates":[[0,0],[0,0]]}).addTo(map);

    // Neighborhoods helpers

      // Default style for neighborhood polygon
      var defaultStyle = {
        fillColor: "#FFF",
        fillOpacity: 0.7,
        weight: 2,
        opacity: 1,
        color: '#000',
        dashArray: '3',
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
        return defaultStyle;
        // var name = feature.properties.label;
        // var returnStyle = defaultStyle;

        // if( name === "Downtown" ) {
        //   returnStyle.fillColor = "#F00";
        // } else if ( name === "East Cambridge") {
        //   returnStyle.fillColor = "#0F0";
        // } else {
        //   returnStyle.fillColor = "#FFF";
        // }

        // return returnStyle;
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
          // mouseover: highlightFeature,
          // mouseout: resetHighlight
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
      _.each(data.features, function(feature) {
        // console.log(feature.properties.label);
        neighborhoodsLayer.addData(feature);
      });
    });


    // $.getJSON('json/boston.json', function (data) {
    //   // var county_geojson = topojson.object(data, data.objects.counties),
    //   //     state_geojson = topojson.object(data, data.objects.states);
    //   neighborhoodsLayer.addData(data);
    //   // state_layer.addData(state_geojson);
    // });
    mapExists = true;
  }
};