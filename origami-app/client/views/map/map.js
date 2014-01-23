mapExists = false;
Template.map.rendered = function() {

  if(!mapExists) {

    // Create map
    var map = L.map('map', { zoomControl:true });
    map.setView([42.3581, -71.0636], 14);
    // var lc = L.control.locate().addTo(map);
    // map.on('dragstart', lc.stopFollowing);


    // Add default OSM image tiles
    var openstreetmapURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        openstreetmapAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        cloudmadeURL = 'http://{s}.tile.cloudmade.com/4f8a96ea698c4630b8abdc34097f92e6/119638/256/{z}/{x}/{y}.png';

    var baseLayer = new L.TileLayer(cloudmadeURL, {
      buffer: 8
    });
    map.addLayer(baseLayer);

    // Add a fake GeoJSON line to coerce Leaflet into creating the <svg> tag that d3_geoJson needs
    new L.geoJson({"type": "LineString","coordinates":[[0,0],[0,0]]}).addTo(map);

  // Highways from OpenStreetMap
  var roadSizes = {
    "highway": "5px",
    "major_road": "3px",
    "minor_road": "1px",
    "rail": "0px",
    "path": "0.5px"
  };
  new L.TileLayer.d3_topoJSON("http://tile.openstreetmap.us/vectiles-highroad/{z}/{x}/{y}.topojson", {
    class: "road",
    layerName: "vectile",
    style: function(d) { return "stroke-width: " + roadSizes[d.properties.kind]; }
  }).addTo(map);


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
          // mouseover: highlightFeature,
          // mouseout: resetHighlight
        });
      };
    
    // Create neighborhoods layer
    var neighborhoodsLayer = L.geoJson(null, {
      style: style,
      class: "mapthing",
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