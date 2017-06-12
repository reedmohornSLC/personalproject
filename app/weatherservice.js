angular.module('maptavius').service('weatherservice',function($http){

  this.weatherHitter = function(sta,loc){
    return $http({
      method:'GET',
      url: "http://api.wunderground.com/api/bba0d25d655a9e04/forecast/q/" + sta +"/"+loc+".json"
    }).then(function(response){
      console.log(response);
      return response.data;
    })
  }
})
