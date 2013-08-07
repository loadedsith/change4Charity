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