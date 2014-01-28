generateSearchTerm = function(activity, time, group, energy ) {
  if( activity === "meal" ) {
    var array = Dining.find({ notForTime: { $ne: time }, notForGroup: { $ne: group }, notForEnergy: { $ne: energy } },
      {fields : {keyword: 1}});
    var list = _.map(array.fetch(), function( val, key ) {
      return val.keyword;
    });
  } else if( activity === "dessert" ) {
    var array = Dessert.find({ notForTime: { $ne: time }, notForGroup: { $ne: group }, notForEnergy: { $ne: energy } },
      {fields : {keyword: 1}});
    var list = _.map(array.fetch(), function( val, key ) {
      return val.keyword;
    });
  } else if( activity === "activity" ) {
    var array = Activities.find({ notForTime: { $ne: time }, notForGroup: { $ne: group }, notForEnergy: { $ne: energy } },
      {fields : {keyword: 1}});
    var list = _.map(array.fetch(), function( val, key ) {
      return val.keyword;
    });
  }

  return list[_.random(0, list.length - 1)];
};