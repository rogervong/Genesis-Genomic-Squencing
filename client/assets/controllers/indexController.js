app.controller('indexController', function($location, $routeParams, $scope){

    $scope.currentPage = $location.path();
    // $scope.id = $routeParams.id;

    // var index = function(){
        // indexFactory.index(function(data){
        //     $scope.genomes = data.data;
        //     console.log(data)
        // });

    // };
    // index();

    // $scope.cancel = function(){
    //     window.history.back();
    // };



});