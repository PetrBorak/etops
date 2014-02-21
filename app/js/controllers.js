var controllers = angular.module("controllers",[]);

controllers.controller("mainController",["$q","$http","$rootScope","$scope","pizzas", function($q,$http,$rootScope, $scope, pizzas){
  var pizzaar = [];
  for(var i = 0; i < pizzas.length; i++){
   var pizza = pizzas[i];
   var discount = Math.round(pizza.discount);
   pizza.discount = discount;
   var price = Math.round(pizza.price);
   pizza.price = price;
   pizzaar[i] = pizza;
  }
  $scope.pizzas = pizzaar;
  $rootScope.addTobasket = function(){
  
  }

}]);