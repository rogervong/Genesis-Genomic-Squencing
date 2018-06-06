app.controller('MainController',function($scope, $rootScope, $location){

     $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $rootScope.currentPage = $location.path();
    });

});