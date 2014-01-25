Template.profile.events({
  'click #upload-image': function( e, template ) {
    filepicker.pick({
        mimetypes: ['image/*'],
        container: 'modal',
        // maxSize: 50*1024,
        // debug: true
      },
      function(InkBlob){
        var url = InkBlob.url;
        Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.imageURL": url}});
      },
      function(FPError){
        OrigamiErrors.throw(FPError.toString());
      }
    );
  },

  'click .edit-name' : function() {
    var editable = Session.get("editname");
    var $name = $(".profile-name");
    var newName = $name.val();
    var $edit = $(".edit-name");
    if( editable ) {
      // Process new name
      $name.prop("disabled", true);
      if( newName !== "") {
        // Save new name
        Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.name":$name.val()}});
      } else {
        // New name was empty, reset to default text
        $name.val("No Name Set");
      }
    } else {
      // Edit new name
      $edit.text("Save");
      $name.prop('disabled', false);
      if ( newName === "No Name Set" ) {
        $name.val("");
      }
      $name.focus();
    }
    Session.set("editname", !editable);
  }
});

Template.profile.helpers({
  profileName: function() {
    var name = Meteor.user().profile.name;
    return name || "No Name Set";
  },
  profilePictureURL: function() {
    var url = Meteor.user().profile.imageURL || "/images/no-user-image.jpg";
    return url;
  }
});

Template.profile.unload = function() {
  Session.set( "editname", false );
};