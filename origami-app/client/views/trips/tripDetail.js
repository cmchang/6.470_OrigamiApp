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

// Track map markers for event locations - TODO
// Unfold the trip detail view - TODO
Template.tripDetail.rendered = function() {
  var tO = -1;
  Meteor.clearTimeout(tO);
  tO = Meteor.setTimeout(function(){
    var bounds = $.map( markers, function( value, indexOrKey ) {
      return value.getLatLng();
    });
    window.map.fitBounds(bounds, {
      paddingTopLeft: [20, 80],
      paddingBottomRight: [400, 20]
    });    
  }, 2000);
}

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
// };

Template.tripDetail.destroyed = function() {
  // catch-all to clear any remaining markers and/or pfold data - TODO
};



Template.eventDetail.events({
  'mouseover .eventDetail': function(e, template){
    var id = template.data._id;
    var marker = markers[id];
    marker.setOpacity(1.0);
    var $controls = $(template.find(".eventIcons")).css('display', 'inline-block');
  },
  'mouseout .eventDetail': function(e, template){
    var id = template.data._id;
    var marker = markers[id];
    marker.setOpacity(0.5);
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
    console.log("reroll ", template.data._id);
    // var evtDet= $(e.target.parentNode.parentNode.parentNode.parentNode);
    // evtDet.toggle("slide", 500, function(){
    //   evtDet.remove();
    // });
  }

});

