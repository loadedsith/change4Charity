/* jshint undef: true, unused: true, white:true, indent: 5 */
/*global $:false */
/*global document:false */
/*global angular:false */
/*global console:false */

var change4Charity = {};
$(document).ready(function() {
  $(document).foundation();
  // $('#introduction').foundation('reveal', 'open');

  var date = new Date();
  $(document).ready(function($) {
    if (!$.cookie("introduction")) {
      var minutes = 30;
      date.setTime(date.getTime() + (minutes * 60 * 1000));
      $('#introduction').foundation('reveal', 'open');
      $.cookie("introduction",true, {expires:date});
      //time() + (10 * 365 * 24 * 60 * 60)
    }
  });
});




change4Charity.app = angular.module( 'change4Charity',['charitiesServices','stringServices','fareCardServices'] );

angular.module('change4Charity').directive('fileChange', fileChange);
angular.module('change4Charity').directive('backImg', backImgDirective);

change4Charity.app.controller( 'MainController', function( $scope, Strings ) {

  Strings.query(function(response){
    $scope.strings = response
    $scope.welcome = $scope.strings.welcome;
  });
  $scope.closeModal = function(){
    $('#introduction').foundation('reveal', 'close');
  }
  
  
});

change4Charity.app.controller( 'fareCardController', function( $scope, FareCards ) {
  $scope.findCard = function(input){
    FareCards.query(function(response){
      var fareCards = response;
      // console.log("fare Cards",input);
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
change4Charity.app.controller( 'CountDownController', function( $scope, $http, $timeout ) {

  $http({method: 'GET', url: '/static/deadlines.json'}).success(function(data, status, headers, config){

    $scope.deadlines = data;
    $scope.now = Date.now();
    $scope.adjacentDeadlines = getAdjacentDeadlines($scope.deadlines, $scope.now);
    $scope.timeScale = getTimeScale($scope.adjacentDeadlines .next, $scope.now);
    // console.log("ts",timeScale);
    // console.log(timeScale,Date.parse(nextDeadline)-now);
    $scope.countdown = ( Date.parse($scope.adjacentDeadlines .next) - $scope.now ) / times[$scope.timeScale];
    
    $scope.updateCountdown($scope.adjacentDeadlines.last, $scope.adjacentDeadlines.next);
  });

  
  // console.log($scope);
 
  // var timeout=1000;
  // $timeout(function() {
  //   
  //         }, timeout);
  $scope.updateCountdown = function(from, to){
    console.log(from,to);
    var percent = ((Date.parse(to) - Date.parse(from))/times[$scope.timeScale])/100;
    console.log("percent",percent);
    var canvas = document.getElementById('clock');
    var context = canvas.getContext('2d');
  
    var x = canvas.width / 2;
    var y = canvas.height / 2;
  
    var radius = 50;
    var startAngle = 1.5 * Math.PI;
    var endAngle = 3.5 * Math.PI;
    var counterClockwise = false;

    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = 12;
    
    context.strokeStyle = 'grey';
    context.stroke();
    
    endAngle = (percent*2)+1.5 * Math.PI;
    
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = 7;

    // line color
    context.strokeStyle = 'black';
    context.stroke();
  }
 
  
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



