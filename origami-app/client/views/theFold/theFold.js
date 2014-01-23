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
	'click .nextModal': function(e){
		var modalID = e.target.parentElement.parentElement.classList[1];
		if (modalID === "modal0"){
			changeModal($(".modal0"), $(".modal1"));
		}else if(modalID === "modal1"){
			changeModal($(".modal1"), $(".modal2"));
		}else if(modalID === "modal2"){
			changeModal($(".modal2"), $(".modal3"));
		}else if(modalID === "modal3"){
			changeModal($(".modal3"), $(".the-fold"));
		}

	},
	'click .arrow_next' : function(e){
		var modalID = e.target.parentElement.parentElement.classList[1]
		if (modalID == "modal0"){
			changeModal($(".modal0"), $(".modal1"));
		}else if (modalID == "modal1"){
			changeModal($(".modal1"), $(".modal2"));
		}else if (modalID == "modal2"){
			changeModal($(".modal2"), $(".modal3"));
		}else if (modalID == "modal3"){
			changeModal($(".modal3"), $(".the-fold"));
		}
	},

	'click .arrow_back' : function(e){
		var modalID = e.target.parentElement.parentElement.classList[1];
		if (modalID == "modal1"){
			changeModal($(".modal1"), $(".modal0"));
		}else if (modalID == "modal2"){
			changeModal($(".modal2"), $(".modal1"));
		}else if (modalID == "modal3"){
			changeModal($(".modal3"), $(".modal2"));
		}
	}	

});

