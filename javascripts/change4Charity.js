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
change4Charity.app.controller( 'MainController', function( $scope, $http, $q ) {
  // we control our app from here

  $q.all([
    $http.get('/static/charities.json'),
    $http.get('/static/strings.json')
  ]).then(function(results) {
     /* your logic here */

     $scope.charities = results[0].data;
     $scope.strings = results[1].data;

  });  // $http.get('/static/charities.json' ).then( function ( response ) {
  //   $scope.charities = response.data;
  // });

  $scope.card = {};

  $scope.findCard = function(){
    $http.get('/static/fakeCard.json' ).then( function ( response ) {
        $scope.cardReply = response.data;
      });

  };
  $scope.donate = function(charity){
    $scope.showSelectedCharity = true;
    $scope.selectedCharity = charity;
    $scope.selectedCharity.charitySelected = $scope.strings.charitySelected;
    
    // console.log("Donate to ",charity);
  };



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

