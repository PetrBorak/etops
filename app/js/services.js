var serviceMod = angular.module("serviceMod",["ngResource"]);
serviceMod.factory("pizzas", function($resource){
  return $resource("http://www.borakpetr.cz/etops/:pizzaId",{pizzaId:"@id"});
});
serviceMod.factory("pizzasLoader",function($resource, $q,pizzas){
 return function(){
  var defered = $q.defer();
  pizzas.query(function(pizzas){
   defered.resolve(pizzas);
  });
  return defered.promise;
 }
});
serviceMod.factory("fakedResponse",function($resource, $q,pizzas,$http){
  return function(){ 
  var defered = $q.defer();
  $http({method: "get", url:"http://www.borakpetr.cz/etopsFaked"}).success(function(data,status,headers,config){
   
   defered.resolve(data)
  }).error(function(data,status,header,config){
   
   defered.reject(data);
  });
  return defered.promise;
  }}); 