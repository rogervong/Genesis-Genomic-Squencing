app.controller('synthesisController', function($location, $routeParams, $scope, $rootScope){

    $rootScope.currentPage = $location.path();
    var _this = this;
    _this.reference;
    _this.compare1;
    $scope.N;
    $scope.S;
    $scope.P;
    $scope.A;

    $scope.buttonPressed = false;

    $scope.calculate = function(){
        if ($scope.buttonPressed==false) {
            $scope.buttonPressed = true;
            $scope.P = ((1 - Math.exp(-2 * $scope.S))/(1 - Math.exp(-4 * $scope.N * $scope.S)));
            if ($scope.P <= 0.05) {
                  $scope.A = "Yes.";
            }
            if ($scope.P >= 0.05) {
                  $scope.A = "No.";
            }
        } else {
            $scope.buttonPressed = false;
        }
    };

    // // $scope.id = $routeParams.id;

    // var index = function(){
    //     analysisFactory.index(function(data){
    //         $scope.genomes = data.data;
    //     });
    // };
    // index();

    // // $scope.cancel = function(){
    // //     window.history.back();
    // // };

    // //example of how to use getAmino
    // // var newAmino = getAmino('T', 'C', 'A');
    // //newAmino.full_name -> 'Serine'
    // //newAmino.short_name -> 'Ser'
    // var getAmino = function(firstLetter, secondLetter, thirdLetter) {
    //     var codon = {
    //         first: firstLetter,
    //         second: secondLetter,
    //         third: thirdLetter
    //     }
    //     analysisFactory.getAmino(codon, function(data) {
    //         return data.data.aminoacid;
    //     })
    // }


    // $scope.submit = function(){
    //     if ($scope.genome_ref != 'Reference' && $scope.genome_comp1 != '1st') {
    //         $location.path('/analysis/results');
    //         var genome_ref = {
    //             simple_name : $scope.genome_ref
    //         }
    //         analysisFactory.getGenome(genome_ref, function(data) {
    //             console.log(data.data.genome);
    //             _this.reference = data.data.genome;
    //             console.log(_this.reference);
    //         });
    //         var genome_comp1 = {
    //             simple_name : $scope.genome_comp1
    //         }
    //         analysisFactory.getGenome(genome_comp1, function(data) {
    //             console.log(data.data.genome);
    //             _this.compare1 = data.data.genome;
    //         });

    //     }

    // };



});
