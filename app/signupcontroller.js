angular.module('maptavius').controller('signupcontroller',function($scope,userservice){
$scope.createUser=function (){
  console.log($scope.newUser)
  userservice.createUser($scope.newUser);
};

setTimeout(function() {

        var getUser = (function() {
            userservice.getUserInfo().then(function(res) {
                $scope.firstName = res.data.firstname;
                $scope.lastName = res.data.lastname;

                if (res.data) {
                    $scope.loggedIn = true;
                } else {
                    $scope.loggedIn = false;
                }
            })
        })();
        console.log($scope.loggedIn);
    }, 50);

})
