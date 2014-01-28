Template.signUp.events({
  'submit form': function( e, template ) {
    e.preventDefault();

    var newUser = {
      email: $(e.target).find('#user-email').val(),
      password: $(e.target).find('#user-password').val(),
      profile: {
        name: $(e.target).find('#user-name').val(),
        city: $(e.target).find('#user-city').val(),
      }
    };

    Accounts.createUser( newUser, function( error ) {
      if( !error ) {
        Router.go("landing");
      } else {
        OrigamiErrors.throw( error );
      }
    });
  }
});