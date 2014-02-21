var directives = angular.module("directives",[]);

directives.directive("basket",function(){
return {
  priority: 0,
  scope: false,
  replace: true,
  restrict: "E",

  templateUrl: "templates/basket.html",
  link: function(scope,el,attr){ 
   console.log('link function of the basket');
   console.log(scope);
  }
}
});

directives.directive("addToBasket",function(){
 return {
 priority: 100,
 restrict: "A",
 scope: false,
 require: "^basketData",
 link: function(scope,el,attr,ctrl){
  console.log("controller found");
  console.log(ctrl);
  $(el).bind("click",function(ev){
   console.log('add to basket price');
   console.log(scope.pizza.price);
   ctrl.addToBasket(scope.pizza._id, scope.pizza.name, scope.pizza.price, scope.pizza.discount)
  });
 }
 }
});

directives.directive("modal",function(){
 return {
 priority: 100,
 restrict: "E",
 scope: false,
 templateUrl: "templates/modal.html"
 }
 });
 
directives.directive("showModal",function(fakedResponse){
 return {
 priority: 100,
 restrict: "A",
 scope: false,
 link: function(scope,el,attr){
  $(el).click(function(event){
   console.log("click");
   fakedResponse().then(function(data){
     scope.x = data.x;
     $(myModal).modal();
   });
  })
 }
 }
 });    

directives.directive("basketData",function(){
 return {
 priority: 100,
 restrict: "A",
 scope: false,
 controller: function($scope){
    item = function(id,name,price, discount,number){
    this.id = id;
    this.name = name;
    this.price = price;
    this.discount = discount;
    this.number = number;
   };
   
   $scope.basket = {};
      
   $scope.basket.items = [];
   
    $scope.basket.open = function(){
    console.log("basket open click");
    console.log($scope.basket.items);
    if($scope.basket.items.length >0){
     $scope.basket.closed = false;
     $scope.basket.show = true;
    } else {
     $scope.basket.emptyAlert = true;
     $scope.basket.closed = false;
    }
   }
   
    $scope.basket.closed = true;
    $scope.basket.emptyAlertClose = function(){
    console.log("scope.basket.emptyAlertClose");
    $scope.basket.emptyAlert = false;
    $scope.basket.closed = true;
   }
   
    $scope.basket.close = function(){
    $scope.basket.emptyAlert = false;
    $scope.basket.closed = true;
    $scope.basket.show = false;
   }
   this.countAmount = function(){
    var amount = 0;
    for(var i=0; i < $scope.basket.items.length; i++){
     amount += $scope.basket.items[i].number; 
    }
    return amount;
   }
   this.countTotal = function(){
    var total = 0;
    for(var i=0; i < $scope.basket.items.length; i++){
     total += (($scope.basket.items[i].number*$scope.basket.items[i].price)-($scope.basket.items[i].number*$scope.basket.items[i].discount));
    }
    return total;
   }
   
   this.addToBasket = function(id, name, price, discount){
    console.log("adding to basket");
    if($scope.basket.items.length == 0){
     $scope.basket.items.push(new item(id,name,price,discount, 1)); 
    }else {
     aiu = false;
     for(var i = 0; i < $scope.basket.items.length; i++){
      console.log('id');
      console.log(id);
      console.log("$scope.basket.items[i].id");
      console.log($scope.basket.items[i].id);
      if($scope.basket.items[i].id == id) {
       aiu = true;
       $scope.basket.items[i].number++;
       $scope.basket.amount = this.countAmount();
       $scope.basket.total = this.countTotal();
       return;
      }
     }
     if(!aiu){
      $scope.basket.items.push(new item(id,name,price,discount,1));
     }
    }
    $scope.basket.amount = this.countAmount();
    $scope.basket.total = this.countTotal();
   }
  },
 link: function(scope,el,attr,ctrl){
  console.log("basket data initialized");
 }
 }
});                  