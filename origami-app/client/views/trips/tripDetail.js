Template.tripDetail.events({
  'click .re-roll-trip': function( e, template ) {
    e.preventDefault();
    var trip = template.data.trip;
    rollTrip(trip._id);
  },

  // 'click .add-event-link': function( e, template ) {
  //   e.preventDefault();
  //   var trip = template.data.trip;
  //   addEvent(trip._id, "dessert");
  // }

});

Template.eventDetail.events({
  'mouseover .eventDetail': function(e, template){
    var $controls = $(template.find(".eventIcons")).css('display', 'inline-block');
  },
  'mouseout .eventDetail': function(e, template){
    var $controls = $(template.find(".eventIcons")).css('display', 'none');
  },
  'click .glyphicon-remove': function(e, template){
    var evtDet= $(template.find(".eventDetail"));
    evtDet.toggle("slide", 500, function(){
      evtDet.remove();
      Events.remove(template.data._id);
    });
  },
  'click .glyphicon-repeat': function(e, template){
    var evtDet= $(e.target.parentNode.parentNode.parentNode.parentNode);
    evtDet.toggle("slide", 500, function(){
      evtDet.remove();
    });
  }

});

// Track map markers for event locations - TODO
// Unfold the trip detail view - TODO
Template.tripDetail.rendered = function() {
  var markers = {};
  var tO = -1;
  
  Events.find({}).observeChanges({
    added: function( _id, fields ) {
      var loc = [fields.location.latitude, fields.location.longitude];
      markers[_id] = L.marker(loc, {
        _id: _id
      })
      .on('mouseover', function(e){
        $("#li-"+_id).addClass("hovered");
      })
      .on('mouseout', function(e){
        $("#li-"+_id).removeClass("hovered");
      })
      .addTo(window.markersLayer)
      .bindPopup(fields.name);

      Meteor.clearTimeout(tO);
      tO = Meteor.setTimeout(function(){
        var bounds = $.map( markers, function( value, indexOrKey ) {
          return value.getLatLng();
        });
        window.map.fitBounds(bounds, {
          paddingTopLeft: [20, 80],
          paddingBottomRight: [400, 20]
        });
      }, 1000);
    },
    removed: function( _id ) {
      window.markersLayer.removeLayer(markers[_id]);
    }
  });

  // if( !rendered ) {
  //   var functionator = function() {
  //     Meteor.clearTimeout(renderedTo);
  //     renderedTo = Meteor.setTimeout( function() {
  //       rendered = true;
  //       var pfold = $("#uc-container").pfold({
  //         easing : 'ease-in-out',
  //         folds : 2,
  //         folddirection: ["left, down"],
  //         centered : false
  //       });
  //       pfold.unfold();
  //     }, 500);
  //   };
  // }
};

Template.tripDetail.destroyed = function() {
  // catch-all to clear any remaining markers and/or pfold data - TODO
};

