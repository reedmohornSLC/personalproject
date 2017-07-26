angular.module('maptavius').controller('picscontroller', function($scope, userservice){

  $scope.uploadPhoto = function (){
    console.log($scope.newPic)
    userservice.insertPhoto($scope.newPic).then(function(response){
      console.log(response.data);
      $scope.photos.push(response.data[0]);
      console.log($scope.photos)
    })
  };

  $scope.getPhotos = function(){
    userservice.getPhotos1().then(function(response){
      $scope.photos = response.data;
      console.log($scope.photos)
    })
  }

  $scope.getPhotos();

})
