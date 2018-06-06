var mongoose = require('mongoose');
var AminoAcid = mongoose.model('AminoAcid');

module.exports = {
    index : function(req, res) {
      // console.log(req.session);
      AminoAcid.find(function(err, aminoacid) {
        if (err) return res.send(err);

        res.send(aminoacid);
      });
    },

    findName : function(req, res) {
        AminoAcid.findOne(req.body, function(err, dbAA) {
            if (err) {
                res.json({status: false, errors: err});
            } else if (!dbAA) {
                res.json({status: false, aminoacid: 'XXX'});
            } else {
                res.json({status: true, aminoacid: dbAA});
            }
        })
    }
};
