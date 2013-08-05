/* jshint undef: true, unused: true, white:true, indent: 5 */
/*global $:false */
/*global document:false */
/*global angular:false */
/*global console:false */

var change4Charity = {};

$(document).foundation();

var date = new Date();
$(document).ready(function($) {
  if (!$.cookie("instructions")) {
    var minutes = 30;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    $('#instructionsModal').foundation('reveal', 'open');
    $.cookie("instructions",true, {expires:date});
    //time() + (10 * 365 * 24 * 60 * 60)
  }
});
change4Charity.app = angular.module( 'change4Charity', [] );
change4Charity.app.controller( 'MainController', function( $scope, $http ) {
  // we control our app from here
  $http.get('/static/charities.json' ).then( function ( response ) {
    $scope.charities = response.data;
  });
  
  $scope.showCharityInfo = function(charity){
    $scope.selected = charity;
  };
  $scope.isShowingCharityInfo = function(charity){
    return $scope.selected === charity;
  };
  
  $scope.showCharities = true;
});
change4Charity.app.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'background-size' : '100%'
        });
    };
});

