Template.sessionLinks.helpers({
  userName: function() {
    var name = Meteor.user().profile.name;
    return name || "No Name Set";
  },
  profilePictureURL: function() {
    var url = Meteor.user().profile.imageURL || "/images/no-user-image.jpg";
    return url;
  }
});