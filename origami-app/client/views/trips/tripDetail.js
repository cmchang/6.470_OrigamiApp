Template.tripDetail.events({
  'click .re-roll-trip': function( e, template ) {
    e.preventDefault();

    var trip = template.data.trip;
    $("the-fold").hide();
    $("body").append($(".the-fold"));
    rollTrip(trip._id);
  },

  'click .add-event-link': function( e, template ) {
    e.preventDefault();

    var trip = template.data.trip;

    addEvent(trip._id, "dessert");
  }

});

Template.eventDetail.events({
  'mouseover .eventDetail': function(e, template){
    var DOMelm = e.target.parentNode;
    
    while(DOMelm.className != "eventDetail"){
      DOMelm = DOMelm.parentNode;
    }
    $(DOMelm.childNodes[1].childNodes[1].childNodes[5]).css('display', 'inline-block');
  },
    'mouseout .eventDetail': function(e, template){
    // console.log(e.target);
    var DOMelm = e.target.parentNode;
    while(DOMelm.className != "eventDetail"){
      DOMelm = DOMelm.parentNode;
    }
    $(DOMelm.childNodes[1].childNodes[1].childNodes[5]).css('display', 'none');
  },
  'click .glyphicon-remove': function(e, template){
    var evtDet= $(e.target.parentNode.parentNode.parentNode.parentNode);
    evtDet.toggle("slide", 500, function(){evtDet.remove(); });
  },
  'click .glyphicon-repeat': function(e, template){
    var evtDet= $(e.target.parentNode.parentNode.parentNode.parentNode);
    evtDet.toggle("slide", 500, function(){
      evtDet.remove();
    });
  }

});

///// Pfold /////

// Template.tripDetail.rendered = function() {
  var markers = {};
  // var tO = -1;
  
  // Events.find({}).observeChanges({
  //   added: function( _id, fields ) {
  //     var loc = [fields.location.latitude, fields.location.longitude];
  //     markers[_id] = L.marker(loc, {
  //       _id: _id
  //     }).addTo(window.markersLayer).bindPopup(fields.name);

  //     // Meteor.clearTimeout(tO);
  //     // tO = Meteor.setTimeout(function(){
  //       var bounds = $.map( markers, function( value, indexOrKey ) {
  //         return value.getLatLng();
  //       });
  //       window.map.fitBounds(bounds, {
  //         paddingTopLeft: [20, 80],
  //         paddingBottomRight: [400, 20]
  //       });
  //     // }, 1000);
  //   },
  //   removed: function( _id ) {
  //     window.markersLayer.removeLayer(markers[_id]);
  //   }
  // });
// };

Template.tripDetail.destroyed = function() {
  // clear all markers
};


///// Pfold /////

var foldProperties = [
  {
    cssVertical: "top",
    cssHorizontal: "left",
    folddirection: [["right", "bottom"], ["bottom", "right"]]
  },
  {
    cssVertical: "top",
    cssHorizontal: "right",
    folddirection: [["left", "bottom"], ["bottom", "left"]]
  },
  {
    cssVertical: "bottom",
    cssHorizontal: "right",
    folddirection: [["left", "top"], ["top", "left"]]
  },
  {
    cssVertical: "bottom",
    cssHorizontal: "left",
    folddirection: [["right", "top"], ["top", "right"]]
  }
];

var pfoldTimeout;

var pfoldGeneration = function() {

  var $pfoldObject = $('<div class="pfold-container"></div>'),
      $ucContainer = $('<div class="uc-container"></div>').appendTo($pfoldObject),
      $initialContent = $('<div class="uc-initial-content"></div>').appendTo($ucContainer),
      $finalContent = $('<div class="uc-final-content" style="position:absolute;top:40px;bottom:40px;width400px;"></div>').appendTo($ucContainer);

  // var foldCSS = foldProperties[Math.floor(Math.random() * 3)];
  // $pfoldObject.css(foldCSS.cssVertical, _.random(20, 250) + "px");
  // $pfoldObject.css(foldCSS.cssHorizontal, _.random(20, 250) + "px");
  console.log(foldCSS);
  var foldCSS = foldProperties[1];
  $pfoldObject.css("top", "80px");
  $pfoldObject.css("right", "40px");

  // Set content of divs
  $initialContent.append('<div style="width:100%;height:100%;background:white;text-align: center;vertical-align: middle;line-height: 8;">Origami</div>');
  $finalContent.append($(".the-fold"));

  $pfoldObject.prependTo('body');
  $(".the-fold").show();
  var pfold = $ucContainer.pfold({
    easing : 'ease-in-out',
    folds : 2,
    folddirection: foldCSS.folddirection[_.random(1)],
    centered : false,
    // Timeout to fold it back up
    // onEndUnfolding: function() {
    //   Meteor.setTimeout(function() {
    //     pfold.fold();
    //   }, _.random(4, 8)*1000);
    // },
    // Remove it once it's been folded back up.
    // onEndFolding: function() {
    //   $pfoldObject.remove();
    //   pfoldTimeout = Meteor.setTimeout(pfoldGeneration, _.random(4,10)*1000);
    //   console.log("reset with to ", pfoldTimeout);
    // }
  });

  Meteor.setTimeout(function(){
    pfold.unfold();
  }, 400);
};

var rendered = false;
Template.tripDetail.rendered = function() {
  if( !rendered ) {
    rendered = true;
    pfoldGeneration();
  }

  console.log("rendered");
  
};

Template.tripDetail.destroyed = function() {
  // console.log("unloading", pfoldTimeout);
  // Meteor.clearTimeout(pfoldTimeout);
  // $pfoldObject.remove();
  // window.markers.clearLayers();

};

