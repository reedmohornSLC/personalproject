angular.module('maptavius').controller('weathercontroller',function($scope,weatherservice){
  $scope.clickSearch =function(p1,p2){
    weatherservice.weatherHitter(p1,p2).then(function(response){
      console.log(response);
      $scope.forecasts = response.forecast.simpleforecast.forecastday;
    });
  }
})
