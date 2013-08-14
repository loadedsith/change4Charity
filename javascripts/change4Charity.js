/* jshint undef: true, unused: true, white:true, indent: 5 */
/*global $:false */
/*global document:false */
/*global angular:false */
/*global console:false */

$(document).ready(function() {
  $(document).foundation();
});
var change4Charity = {};

change4Charity.app = angular.module( 'change4Charity',['usersServices','charitiesServices','stringServices','ventraServices','fareCardServices'] ).
        config(function($routeProvider, $locationProvider){
          $locationProvider.html5Mode(true);
          $routeProvider.when("/",{controller: 'VentraController',templateUrl:"/partials/ventra.html"}).
                         when("/welcome",{controller: 'WelcomeController',templateUrl:"/partials/welcome.html"}).
                         when("/app",{controller: 'MainController',templateUrl:"/partials/stats.html"});
        });



angular.module('change4Charity').directive('fileChange', fileChange);

angular.module('change4Charity').filter('titleCase', function () {
  return function (input) {
    var words = input.split(' ');
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  };
});


change4Charity.app.controller( 'WelcomeController', function( $scope, Strings ) {
  Strings.query(function(response){
    $scope.welcome = response.welcome;
  });
});
change4Charity.app.controller( 'VentraController', function( $scope, $location, Ventra, Strings, Users) {
  Strings.query(function(response){
    $scope.strings = response;
    $scope.login = $scope.strings.login;
  });
  Ventra.query(function(response){
    $scope.ventra = response[0];
    $scope.ventra.fields.visa = "xxxx-xxxx-xxx-"+response[0].fields.visa.substring(response[0].fields.visa.length-4, response[0].fields.visa.length);
  });
  $scope.revealLogin = function(){
    $('#login').foundation('reveal', 'open');
  };
  $scope.submitLogin = function(){
    if( $scope.login.inputs[0].value!== undefined){
      $scope.user = $scope.user || {};
      $scope.user.username = $scope.login.inputs[0].value;  
      Users.save({"Useh":{"key":"value"}})
    }
    $('#login').foundation('reveal', 'close');
    $location.path( "/app" );
  };
});
change4Charity.app.controller( 'MainController', function( $scope, Strings, Users ) {
  $scope.stats = $scope.stats || {};
  $scope.login = $scope.login || {};
  $scope.user = Users.query() ;

  $scope.user.showInfo = true;
  $scope.stats.charityDonations = 2134;
  $scope.stats.rideDonations = 213;
  Strings.query(function(response){
    $scope.strings = response;
    $scope.welcome = $scope.strings.welcome;
    $scope.login = $scope.strings.login;
  });
    
  $scope.closeModal = function(){
    $('#introduction').foundation('reveal', 'close');
    $('#login').foundation('reveal', 'close');
  };
  $scope.revealLogin = function(){
    $('#login').foundation('reveal', 'open');
  };
  $scope.menuClick = function(){
    $(".top-bar").toggleClass("expanded");
    // $(document).foundation();
  };
  $scope.loginInfo = function(){
    $($scope.login.inputs).each(function(){
      if(this.name === "username"||this.name === "Username"){
        $scope.user.username = this.value;
        $scope.user.showInfo = true;
        $scope.user.showLogin = false;
        $.cookie("login",JSON.stringify({"user":$scope.user.username}));
      }
    });
    $('#login').foundation('reveal', 'close');
  };
  $scope.login.loginInit = function(){
    var date = new Date();
    // $('#login').foundation('reveal', 'open');
    if ( !$.cookie("login") ) {
      var minutes = 30;
      date.setTime(date.getTime() + (minutes * 60 * 1000));
      $('#login').foundation('reveal', 'open');
      $.cookie("login",true, {expires:date});
      //time() + (10 * 365 * 24 * 60 * 60)
    }
  };
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
    });
  };  
});
change4Charity.app.controller( 'CountDownController', function( $scope, $http, $timeout ) {

  $http({method: 'GET', url: '/static/deadlines.json'}).success(function(data, status, headers, config){

    $scope.deadlines = data;
    $scope.now = Date.now();
    $scope.adjacentDeadlines = getAdjacentDeadlines($scope.deadlines, $scope.now);
    $scope.timeScale = getTimeScale($scope.adjacentDeadlines .next, $scope.now);
    $scope.countdown = ( Date.parse($scope.adjacentDeadlines .next) - $scope.now ) / times[$scope.timeScale];
    if( Math.floor($scope.countdown) === 1){
      $scope.timeScale = $scope.timeScale.substring(0, $scope.timeScale.length - 1);      
    }
    $scope.updateCountdown($scope.adjacentDeadlines.last, $scope.adjacentDeadlines.next);
  });

  $scope.updateCountdown = function(from, to){
    var end = Date.parse(to)
    var begin = Date.parse(from)
    var now = $scope.now;
    
    var duration = end - begin;
    var left = now - begin;

    var percent = (left / duration) ;
    
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
    
    // endAngle = (percent*2)+1.5 * Math.PI;
    endAngle = (3.5-(3.5*percent)) * Math.PI;
    
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

  $scope.selectedCharity = {};
  Charities.query(function(response){
      $scope.charities = response
  });

  $scope.selectedCharityInit = function(){

    $('#selectedCharity').foundation('reveal', 'reflow');
  }

  $scope.donate = function(charity){
    console.log(charity);
    console.log($scope);
    $scope.showSelectedCharity = true;
    $scope.selectedCharity = charity;
    $scope.selectedCharity.charitySelected = $scope.strings.charitySelected;
    $('#selectedCharity').foundation('reveal', 'open');
    
  };

  $scope.showCharityInfo = function(charity){
    $scope.selected = charity;
  };
  $scope.isShowingCharityInfo = function(charity){
    return $scope.selected === charity;
  };
  
  $scope.showCharities = true;
});


