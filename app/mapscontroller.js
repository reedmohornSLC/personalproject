angular.module('maptavius').controller('mapscontroller', function($scope,userservice) {
    $scope.resorts = ["alta", "beaver", "brianhead","brighton","cherrypeak","deervalley","eaglepoint","nordicvalley","parkcity","powdermountain","snowbird","solitude","sundance"];

    $scope.findMap = function(){
       console.log($scope.selectedName);
       userservice.getMap($scope.selectedName).then(function(response){
         $scope.results = response.data;
         console.log($scope.results)
       });

    }

});
