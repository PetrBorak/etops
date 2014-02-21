require(["bootstrap","jquery","angularjs","controllers","directives","services","angularjsresource","router"],function(){
 angular.element(document).ready(function(){
  angular.module('myApp',['controllers','routermod','directives','serviceMod']);
  angular.bootstrap(document,['myApp']);
 });
})
