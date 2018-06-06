var mongoose = require('mongoose');
var Genome = mongoose.model('Genome');

module.exports = {

  index : function(req, res) {
    // console.log(req.session);
    Genome.find(function(err, genomes) {
      if (err) return res.send(err);

      res.send(genomes);
    });
  },

  findGenome : function(req, res) {
      Genome.findOne(req.body, function(err, dbGenome) {
          if (err) {
              res.json({status: false, errors: err});
          } else if (!dbGenome) {
              res.json({status: false});
          } else {
              res.json({status: true, genome: dbGenome});
          }
      })
  }

};
