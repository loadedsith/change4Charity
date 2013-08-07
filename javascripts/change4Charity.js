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
change4Charity.app = angular.module( 'change4Charity',['charitiesServices','stringServices','fareCardServices'] );

angular.module('change4Charity').directive('fileChange', fileChange);
angular.module('change4Charity').directive('backImg', backImgDirective);

change4Charity.app.controller( 'MainController', function( $scope, Strings ) {

  Strings.query(function(response){
      $scope.strings = response
  });
  
});

change4Charity.app.controller( 'fareCardController', function( $scope, FareCards ) {
  $scope.findCard = function(input){
    FareCards.query(function(response){
      var fareCards = response;
      console.log("fare Cards",input);
      $scope.fareCard = fareCards[0];
      $scope.showCardResults = true;
      // $scope.fareCardResult
    });
  };
  $scope.setFile = function(element) {
    $scope.$apply(function() {
      $scope.findCard(element.files[0]);
    })
  };  
});


change4Charity.app.controller( 'CharitiesController', function( $scope, Charities ) {
  $scope.card = {};
  Charities.query(function(response){
      $scope.charities = response
  });
  
  $scope.donate = function(charity){
    $scope.showSelectedCharity = true;
    $scope.selectedCharity = charity;
    $scope.selectedCharity.charitySelected = $scope.strings.charitySelected;
  };

  $scope.showCharityInfo = function(charity){
    $scope.selected = charity;
  };
  $scope.isShowingCharityInfo = function(charity){
    return $scope.selected === charity;
  };
  
  $scope.showCharities = true;
});



