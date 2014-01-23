// if( Meteor.users.find().count() === 0 ) {

//   var tempUserId = Accounts.createUser({
//     email: "origami@mit.edu",
//     password: "muchwow"
//   });

//     var crackTripId = Trips.insert({
//       userId: tempUserId,
//       timeOfDay: "evening",
//       mood: 'romantic',
//       energy: 'energetic',
//       moreCrack: 'yes',
//       name: "Fixture Trip"
//     });

//       Events.insert({
//         tripId: crackTripId,
//         name: "Sam LaGrassa's",
//         location: {
//           address: "44 Province St",
//           city: "Boston",
//           latitude: "",
//           longitude: "",
//         },
//         phoneNo: "6173576861",
//         image: "http://s3-media1.ak.yelpcdn.com/bphoto/85_HoifJk7HpvkoiDTQI4g/ms.jpg",
//         rating: {
//           yelp: "4.5",
//           user: "",
//         },
//         tripDetails: {
//           order: 1,
//           time: "6:00",
//         }
//       });

//       Events.insert({
//         tripId: crackTripId,
//         name: "Coke Park/Whitey's",
//         location: {
//           address: "268 W Broadway",
//           city: "Boston",
//           latitude: "",
//           longitude: "",
//         },
//         phoneNo: "6174644869",
//         image: "http://s3-media1.ak.yelpcdn.com/bphoto/WARBbGlrukFcgcJbdNRY8Q/ms.jpg",
//         rating: {
//           yelp: "4.5",
//           user: "",
//         },
//         tripDetails: {
//           order: 1,
//           time: "8:00",
//         }
//       });
// }



Meteor.startup( function() {
  // if( true ) {
    Meteor.users.remove({});
    Trips.remove({});
    Events.remove({});
  // }
  Accounts.createUser({
    email: "origami@mit.edu",
    password: "muchwow"
  });
});