Template.theFold.rendered = function(){
	var weekday = new Date().getDay();
	var weekdays = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday"};
	var day = String(weekdays[weekday]);
	$(".weekday").text(day);
	$(".date_container").addClass(String([weekday]));
};