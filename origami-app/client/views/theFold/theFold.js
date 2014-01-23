Template.theFold.helpers({
  special: function() {
    return Session.get("isSpecial");
  }
});

var changeModal = function(view1, view2){
	view1.hide();
	view2.show();
}

Template.theFold.events({
  'click #special-link': function() {
    return Session.set("isSpecial", !Session.get("isSpecial"));
  },
  'click .showFold0': function(){
  	changeModal($(".modal0"), $(".modal1"));
  	
  },
  'click .showFold1': function(){
  	changeModal($(".modal1"), $(".modal2"));

  },
  'click .showFold2': function(){
  	changeModal($(".modal2"), $(".modal3"));
  },
  'click .showFold3': function(){
  	changeModal($(".modal3"), $(".the-fold"));
  }

});

