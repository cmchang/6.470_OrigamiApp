Template.logIn.events({
  'submit form': function( e, template ) {
    e.preventDefault();

    var email = $(e.target).find('#user-email').val();
    var password = $(e.target).find('#user-password').val();

    Meteor.loginWithPassword( email, password, function( Error ) {
      console.log(Error ? Error : "FOOOOOOOOOL");
    });
  }
});