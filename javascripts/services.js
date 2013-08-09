/* jshint undef: true, unused: true, white:true, indent: 5 */
/*global angular:false */
/*global console:false */
/*global console:false */

angular.module('getFareCardFromImageServices', ['ngResource']).factory('FareCards', function($resource) {
  return $resource('/API/card',{}, {
      query:{method:'GET', isArray:true}
    });
});


angular.module('fareCardServices', ['ngResource']).factory('FareCards', function($resource) {
  return $resource('/static/cards.json',{}, {
      query:{method:'GET', isArray:true}
    });
});

angular.module('charitiesServices', ['ngResource']).factory('Charities', function($resource) {
  return $resource('/static/charities.json',{}, {
      query:{method:'GET', isArray:true}
    });
});
angular.module('stringServices', ['ngResource']).factory('Strings', function($resource) {
  
  return $resource('/static/strings.json',{}, {
      query:{method:'GET', isArray:false}
    });
});
angular.module('deadlinesServices', ['ngResource']).factory('Deadlines', function($resource) {
  
  return $resource('/static/deadlines.json',{}, {
      query:{method:'GET', isArray:true}
    });
});

var times = {
  "Years"     : 1000 * 60 * 60 * 24 * 365,
  // "week"     : 1000 * 60 * 60 * 24 * 7,
  "Days"      : 1000 * 60 * 60 * 24,
  "Hours"     : 1000 * 60 * 60,
  "Minutes"   : 1000 * 60,
  "Seconds"   : 1000
};

function getAdjacentDeadlines(deadlines, now){
  var nextDeadline = 0;
  for (var di = 0; di < deadlines.length; di++) {
      var deadline = deadlines[di];
      var deadlineInMilli = Date.parse(deadline.toString());
      if(now < deadlineInMilli){
        if(deadlines[di-1]!== undefined){
          return {"last":deadlines[di-1],"next":deadline};          
        }else{
          console.log("this should not happen, it was gracefully handled by setting the last deadline to (now minus one day), but is not a good idea.")
          return {"last":now-times.Days,"next":deadline};          
        }

      }
  }
}


function getTimeScale(nextDeadline, now){
  var countdownInMilli =  Date.parse(nextDeadline) - now;
  var keys = Object.keys(times);  
  for (var timeCounter = keys.length - 1; timeCounter >= 0; timeCounter--) {
    var time = times[keys[timeCounter]];
    if(countdownInMilli <= time){
      if(timeCounter == keys.length){
        return keys[timeCounter];       
      }
      return keys[timeCounter+1];

    }
  }
  // return {name:value};
}