angular.module('maptavius').service('userservice',function($http){
  this.createUser=function(user){
    console.log(user)
    return $http({
      method:"POST",
      url:"/api/newuser",
      data: user

    }).then(function(response){
      console.log(response);

    })
  }

  //this.apiCallWithInfoFromDatabase aka map id for api input
  this.getMap = function(selected){
    return $http({
      method:"GET",
      url:"/api/maps/" + selected

    }).then(function(response){
      //map response from database should be beamed back from database through the server
      console.log(response);
      return response;//this was forgotten!
    })

  }

  this.getUserInfo = function(){
        return $http.get("getuserinfo");
  };


  this.insertPhoto = function(photo){
    console.log(photo)
    return $http({
      method:"POST",
      url:"/api/newphoto",
      data:photo
    }).then(function(response){
        console.log(response);
        return response;
    })
  }

  this.getPhotos1 = function(){
    return $http({
      method:"GET",
      url:"/api/photos"
    })
  }

})
