var mongoose = require('mongoose');

var genomeSchema = mongoose.Schema({
    locus: {
        type: String,
        required: true
    },

    definition: {
        type: String,
        required: true
    },

    sequence: {
        type: String,
        require: true
    },

    simple_name: {
        type: String,
        require: true
    },

    type: {
        type: String
    }

}, {timestamps: true});

var aminoAcidCodonSchema = mongoose.Schema({
    first: {
        type: String,
        required: true
    },

    second: {
        type: String,
        required: true
    },

    third: {
        type: String,
        require: true
    },

    full_name: {
        type: String
    },

    short_name: {
        type: String
    },

});


//to call the genomes use this model call
var Genome = mongoose.model('Genome', genomeSchema);

var AminoAcid = mongoose.model('AminoAcid', aminoAcidCodonSchema)
