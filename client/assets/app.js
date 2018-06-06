var app = angular.module('app', ['ngRoute', 'app.controllers', 'app.directives']);

    angular.module('d3', []);
    angular.module('app.controllers', []);
    angular.module('app.directives', [ 'd3' ]);


app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'assets/partials/index.html',
        controller: 'indexController'
    })
    .when('/genesis', {
        templateUrl: 'assets/partials/analysis.html',
        controller: 'analysisController'
    })
    .when('/analysis', {
        templateUrl: 'assets/partials/analysis.html',
        controller: 'analysisController'
    })
    .when('/analysis/results', {
        templateUrl: 'assets/partials/analysis_results.html',
        controller: 'resultsController'
    })
    .when('/synthesis', {
        templateUrl: 'assets/partials/synthesis.html',
        controller: 'synthesisController'
    })
    .when('/phylogenetics', {
        templateUrl: 'assets/partials/phylogenetics.html',
        // controller: 'analysisController'
    })
    .otherwise({
        redirectTo: '/'
    });
});
