// if( Meteor.users.find().count() === 0 ) {
//   var userId = Accounts.createUser({
//     email: "origami@mit.edu",
//     password: "muchwow",
//     profile: {
//       name: "Team Origami",
//       city: "Boston, MA",
//     }
//   });
// }

if( Badges.find().count() === 0 ) {

    Badges.insert({
      name: "Hopeless Romantic",
      image: "/images/badges/image.png",
      description: "To unlock this badge, go on 15 romantic dates <3"

    });
    Badges.insert({
      name: "Sushi Inamoratum",
      image: "/images/badges/image1.png",
      description: "To unlock this badge, almost get mercury poisoning! Visit 25 japanese restaurants (including Douzo)"
    });

    Badges.insert({
      name: "Gorilla",
      image: "/images/badges/image2.png",
      description: "Mystery Badge!"
    });

    Badges.insert({
      name: "Tree Hugger",
      image: "/images/badges/image3.png",
      description: "To unlock this badge, visit 3 parks"

    });
    
    Badges.insert({
      name: "Lone Wolf",
      image: "/images/badges/image4.png",
      description: "To unlock this badge, go on 10 trips by yourself"
    });

    Badges.insert({
      name: "Family Wo(Man)",
      image: "/images/badges/image5.png",
      description: "To unlock this badge, go on 10 trips with your family"
    });

    Badges.insert({
      name: "Mall Rat",
      image: "/images/badges/image6.png",
      description: "To unlock this badge, visit 7 malls"
    });

    Badges.insert({
      name: "Explorer",
      image: "/images/badges/image7.png",
      description: "To unlock this badge, visit 10 neighborhoods"
    });

    Badges.insert({
      name: "Super Trooper",
      image: "/images/badges/image8.png",
      description: "To unlock this badge, withstand rainy days during 5 of your trips"
    });
    Badges.insert({
      name: "Gregariuos Groupie",
      image: "/images/badges/image9.png",
      description: "To unlock this badge, go on 10 trips with your friends"
    });
    Badges.insert({
      name: "Polarbear Club",
      image: "/images/badges/image.png",
      description: "To unlock this badge, go on 5 trips when the temperature is below 10 degrees"
    });
    Badges.insert({
      name: "Burger Bum",
      image: "/images/badges/image1.png",
      description: "To unlock this badge, go to 20 burger joints"
    });
}


if( Dining.find().count() === 0 ) {
  Dining.insert({
    keyword: "breakfast",
    notForTime: ["afternoon", "evening", "night"],
    notForGroup: [],
    notForEnergy: [],
  });

  Dining.insert({
    keyword: "coffee",
    notForTime: ["evening", "night"],
    notForGroup: [],
    notForEnergy: [],
  });

  Dining.insert({
    keyword: "cafe",
    notForTime: ["evening", "night"],
    notForGroup: [],
    notForEnergy: [],
  });

  Dining.insert({
    keyword: "pancakes",
    notForTime: ["afternoon", "evening", "night"],
    notForGroup: ["romantic"],
    notForEnergy: [],
  });

  Dining.insert({
    keyword: "diner",
    notForTime: [],
    notForGroup: ["romantic"],
    notForEnergy: ["quiet"],
  });

  Dining.insert({
    keyword: "sandwiches",
    notForTime: ["morning", "evening", "night"],
    notForGroup: [],
    notForEnergy: [],
  });

  Dining.insert({
  keyword: "italian",
  notForTime: ["morning"],
  notForGroup: [],
  notForEnergy: [],
  });

  Dining.insert({
    keyword: "japanese",
    notForTime: ["morning"],
    notForGroup: [],
    notForEnergy: [],
    });

  Dining.insert({
    keyword: "american",
    notForTime: ["morning"],
    notForGroup: [],
    notForEnergy: [],
  });

  Dining.insert({
    keyword: "dinner",
    notForTime: ["morning", "afternoon"],
    notForGroup: [],
    notForEnergy: [],
  });
  Dining.insert({
    keyword: "Food Trucks",
    notForTime: ["evening", "night"],
    notForGroup: ["romantic"],
    notForEnergy: ["quiet", "relaxed"],
  });
 Dining.insert({
    keyword: "sushi",
    notForTime: ["morning"],
    notForGroup: [],
    notForEnergy: [],
  });
}


if( Dessert.find().count() === 0 ) {

  Dessert.insert({
    keyword: "dessert",
    notForTime: ["morning"],
    notForGroup: [],
    notForEnergy: [],
  });

  Dessert.insert({
    keyword: "ice cream",
    notForTime: ["morning"],
    notForGroup: [],
    notForEnergy: [],
  });

  Dessert.insert({
    keyword: "froyo",
    notForTime: ["morning"],
    notForGroup: [],
    notForEnergy: [],
  });

  Dessert.insert({
    keyword: "pastry",
    notForTime: ["morning"],
    notForGroup: [],
    notForEnergy: [],
  });
  Dessert.insert({
    keyword: "bakery",
    notForTime: ["morning", "evening", "night"],
    notForGroup: [],
    notForEnergy: ["energetic"],
  });
  Dessert.insert({
    keyword: "gelato",
    notForTime: ["morning"],
    notForGroup: [],
    notForEnergy: [],
  });
  Dessert.insert({
    keyword: "cupcakes",
    notForTime: ["morning"],
    notForGroup: [],
    notForEnergy: [],
  });
  Dessert.insert({
    keyword: "internet cafe",
    notForTime: ["morning"],
    notForGroup: ["family", "romantic"],
    notForEnergy: ["energetic"],
  });
}


if( Activities.find().count() === 0 ) {

  Activities.insert({
    keyword: "park",
    notForTime: ["night"],
    notForGroup: [],
    notForEnergy: ["energetic"],
  });

  Activities.insert({
    keyword: "library",
    notForTime: ["evening", "night"],
    notForGroup: ["romantic", "friends"],
    notForEnergy: ["energetic", "conversational"],
  });
  
  Activities.insert({
    keyword: "wine tasting",
    notForTime: ["morning", "night"],
    notForGroup: ["family"],
    notForEnergy: ["energetic"],
  });

  Activities.insert({
    keyword: "rock climbing",
    notForTime: ["morning", "night"],
    notForGroup: ["romantic", "alone"],
    notForEnergy: ["conversational", "relaxed", "quiet"],
  });

  Activities.insert({
    keyword: "kayaking",
    notForTime: ["morning", "night"],
    notForGroup: ["romantic", "alone"],
    notForEnergy: ["conversational", "relaxed", "quiet"],
  });

  Activities.insert({
    keyword: "sky zone",
    notForTime: ["morning", "night"],
    notForGroup: ["romantic", "alone"],
    notForEnergy: ["conversational", "relaxed", "quiet"],
  });

  Activities.insert({
    keyword: "shopping",
    notForTime: ["morning"],
    notForGroup: ["romantic"],
    notForEnergy: ["energetic", "relaxed"],
  });

  Activities.insert({
    keyword: "bike path",
    notForTime: ["night"],
    notForGroup: [],
    notForEnergy: ["conversational", "relaxed"],
  });

  Activities.insert({
    keyword: "museums",
    notForTime: ["morning", "night"],
    notForGroup: ["romantic"],
    notForEnergy: ["energetic"],
  });

  Activities.insert({
    keyword: "movies",
    notForTime: ["morning"],
    notForGroup: [],
    notForEnergy: ["conversational", "energetic", "quiet"],
  });

  Activities.insert({
    keyword: "historical",
    notForTime: ["morning", "night"],
    notForGroup: ["romantic"],
    notForEnergy: ["energetic"],
  });

  Activities.insert({
    keyword: "ballet",
    notForTime: ["morning", "night"],
    notForGroup: [],
    notForEnergy: ["energetic"],
  });

  Activities.insert({
    keyword: "opera",
    notForTime: ["morning", "night"],
    notForGroup: [],
    notForEnergy: ["energetic", "quiet"],
  });

  Activities.insert({
    keyword: "comedy",
    notForTime: ["morning", "night"],
    notForGroup: [],
    notForEnergy: ["energetic", "quiet"],
  });

  Activities.insert({
    keyword: "theater",
    notForTime: ["morning", "night"],
    notForGroup: [],
    notForEnergy: ["energetic", "quiet"],
  });

  Activities.insert({
    keyword: "musical",
    notForTime: ["morning", "night"],
    notForGroup: [],
    notForEnergy: ["energetic", "quiet"],
  });

  Activities.insert({
    keyword: "bar",
    notForTime: ["morning", "afternoon"],
    notForGroup: ["family", "romantic"],
    notForEnergy: ["relaxed", "quiet"],
  });

  Activities.insert({
    keyword: "club",
    notForTime: ["morning", "afternoon"],
    notForGroup: ["family", "romantic"],
    notForEnergy: ["relaxed", "quiet"],
  });

  Activities.insert({
    keyword: "dive bar",
    notForTime: ["morning", "afternoon"],
    notForGroup: ["family", "romantic"],
    notForEnergy: ["relaxed", "quiet"],
  });

  Activities.insert({
    keyword: "Mini Golf",
    notForTime: ["night"],
    notForGroup: ["alone"],
    notForEnergy: ["quiet"],
  });

  Activities.insert({
    keyword: "Golf",
    notForTime: ["night"],
    notForGroup: [],
    notForEnergy: ["energetic"],
  })

  Activities.insert({
    keyword: "Aquariums",
    notForTime: ["night", "evening"],
    notForGroup: [],
    notForEnergy: ["energetic"],
  });

  Activities.insert({
    keyword: "Bowling",
    notForTime: ["morning"],
    notForGroup: ["alone"],
    notForEnergy: ["quiet", "relaxed"],
  });

}