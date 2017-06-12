angular.module('maptavius').controller('signupcontroller',function($scope,userservice){
$scope.createUser=function (){
  console.log($scope.newUser)
  userservice.createUser($scope.newUser);
};



})
