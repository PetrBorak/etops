var routermod = angular.module("routermod",["ngResource"]);
routermod.config(function($routeProvider){
 $routeProvider.when("/",{controller:"mainController",templateUrl:"templates/mainTemplate.html",resolve:{pizzas:function(pizzasLoader){return pizzasLoader();}}});
});
