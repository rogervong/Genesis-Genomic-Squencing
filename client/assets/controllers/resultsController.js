app.controller('resultsController', function(analysisFactory, $location, $routeParams, $scope, $rootScope, analysisService){
    $scope.load = function() {

        $scope.ref = {
            "codon": analysisService.getReferenceCodon(),
            "amino": analysisService.getReferenceAmino()
        };

        $scope.comp1 = {
            "codon": analysisService.getCompare1Codon(),
            "amino": analysisService.getCompare1Amino(),
            "color": analysisService.getCompare1Color()
        };

        $scope.comp2 = {
            "codon": analysisService.getCompare2Codon(),
            "amino": analysisService.getCompare2Amino(),
            "color": analysisService.getCompare1Color()
        };

        $scope.comp3 = {
            "codon": analysisService.getCompare3Codon(),
            "amino": analysisService.getCompare3Amino(),
            "color": analysisService.getCompare1Color()
        };

        $scope.comp4 = {
            "codon": analysisService.getCompare4Codon(),
            "amino": analysisService.getCompare4Amino(),
            "color": analysisService.getCompare1Color()
        };
    }
    $scope.load();
});
