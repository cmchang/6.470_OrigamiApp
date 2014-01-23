var changeModal = function(view1, view2){
	view1.hide();
	view2.show();
};

weekdays = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday"};

increaseDay = function(day){
	$(".date_container").removeClass(day);
	var next = parseInt(day) + 1;
	if (next == 8){ next = 0; }
	$(".date_container").addClass(String(next));
	var day = String(weekdays[next]);
	$(".date_container").text(day);


};

Template.theFold.events({
	'click #special-link': function() {
		return Session.set("isSpecial", !Session.get("isSpecial"));
	},
	'click .nextModal': function(e){
		e.preventDefault();
		var currentTrip = Session.get("currentTrip");

		var modalID = e.target.parentElement.parentElement.classList[1];
		if (modalID === "modal0"){
			changeModal($(".modal0"), $(".modal1"));
		}else if(modalID === "modal1"){
			changeModal($(".modal1"), $(".modal2"));
		}else if(modalID === "modal2"){
			changeModal($(".modal2"), $(".modal3"));
		}else if(modalID === "modal3"){
			console.log(currentTrip);
			Meteor.call("insertTrip",
				currentTrip.time,
				currentTrip.type,
				currentTrip.energy,
				function( error, tripId ) {
					if( !error ) {
						Meteor.call("rollTrip", tripId);
						Router.go('tripDetail', {_id: tripId});
					} else {
						alert(error);
					}
				});
			return;
		}

		var eventData = e.target.dataset["event"].split(":");
		currentTrip[eventData[0]] = eventData[1];
		Session.set("currentTrip", currentTrip);

	},
	'click .right_arrow' : function(e){
		if ($(e.target).hasClass("0")){
			increaseDay(0);
		}else if($(e.target.parentElement).hasClass("1")){
			increaseDay(1);
		}else if($(e.target.parentElement).hasClass("2")){
			increaseDay(2);
		}else if($(e.target.parentElement).hasClass("3")){
			increaseDay(3);
		}else if($(e.target.parentElement).hasClass("4")){
			increaseDay(4);
		}else if($(e.target.parentElement).hasClass("5")){
			increaseDay(5);
		}else if($(e.target.parentElement).hasClass("6")){
			increaseDay(6);
		}
	},

	'click .arrow_next' : function(e){
		var modalID = e.target.parentElement.parentElement.classList[1];
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

