app.factory('analysisFactory', function($http, analysisService){

    var factory = {};



    factory.index = function(callback){
        $http.get('/genomes/').then(function(returned_data){
        callback(returned_data)
      });
    };

    // factory.getGenome = function(simple_name, callback) {
    //     $http.post('/getGenome', simple_name).then(function(returned_data) {
    //         callback(returned_data)
    //     });
    // }

    factory.getGenome = function(simple_name) {
        return $http.post('/getGenome', simple_name);
    }

    factory.getAmino = function(codon, callback) {
        $http.post('/getAmino', codon).then(function(returned_data) {
            callback(returned_data)
        });
    }



    return factory;
});
