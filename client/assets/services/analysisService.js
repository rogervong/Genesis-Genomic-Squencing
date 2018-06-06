app.service('analysisService', function() {
  var reference_codon = [];
  var reference_amino = [];
  var reference_name = '';
  var compare1_codon = [];
  var compare1_amino = [];
  var compare1_color = [];
  var compare1_name = '';
  var compare2_codon = [];
  var compare2_amino = [];
  var compare2_color = [];
  var compare2_name = '';
  var compare3_codon = [];
  var compare3_amino = [];
  var compare3_color = [];
  var compare3_name = '';
  var compare4_codon = [];
  var compare4_amino = [];
  var compare4_color = [];
  var compare4_name = '';

  var clear = function() {
      var reference_codon = [];
      var reference_amino = [];
      var compare1_codon = [];
      var compare1_amino = [];
      var compare1_color = [];
      var compare2_codon = [];
      var compare2_amino = [];
      var compare2_color = [];
      var compare3_codon = [];
      var compare3_amino = [];
      var compare3_color = [];
      var compare4_codon = [];
      var compare4_amino = [];
      var compare4_color = [];
  }

  var allNames = function() {
      var names = [reference_name, compare1_name, compare2_name, compare3_name, compare4_name];
      return names;
  }

  var getRelation = function(number1, number2) {
      var codonMap = {
          0:reference_codon,
          1:compare1_codon,
          2:compare2_codon,
          3:compare3_codon,
          4:compare4_codon
      }
      var firstCodon = codonMap[number1];
      var secondCodon = codonMap[number2];
      if (firstCodon.length <= secondCodon.length) {
          var short_length = firstCodon.length;
      } else {
          var short_length = secondCodon.length;
      }
      var differences = 0;
      for (var i = 0; i < short_length; i++) {
          if(firstCodon[i] != secondCodon[i]) {
              differences++;
          }
      }
      return differences/short_length;
  }

  var getBarGraphInfo = function(number) {
      var compare;
      if (number == 1) {
          compare = compare1_amino;
      } else if (number == 2) {
          compare = compare2_amino;
      } else if (number == 3) {
          compare = compare3_amino;
      } else if (number == 4) {
          compare = compare4_amino;
      } else {
          compare = reference_amino;
      }
      var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var amino = ['Ala','Arg','Asn','Asp','Cys','Glu','Gln','Gly','His','Ile','Leu','Lys','Met','Phe','Pro','Ser','Thr','Trp','Tyr','Val']
      for (var i = 0; i < compare.length; i++) {
          if (compare[i] == 'Ala') {
              counts[0]++;
          } else if (compare[i] == 'Arg') {
              counts[1]++;
          } else if (compare[i] == 'Asn') {
              counts[2]++;
          } else if (compare[i] == 'Asp') {
              counts[3]++;
          } else if (compare[i] == 'Cys') {
              counts[4]++;
          } else if (compare[i] == 'Glu') {
              counts[5]++;
          } else if (compare[i] == 'Gln') {
              counts[6]++;
          } else if (compare[i] == 'Gly') {
              counts[7]++;
          } else if (compare[i] == 'His') {
              counts[8]++;
          } else if (compare[i] == 'Ile') {
              counts[9]++;
          } else if (compare[i] == 'Leu') {
              counts[10]++;
          } else if (compare[i] == 'Lys') {
              counts[11]++;
          } else if (compare[i] == 'Met') {
              counts[12]++;
          } else if (compare[i] == 'Phe') {
              counts[13]++;
          } else if (compare[i] == 'Pro') {
              counts[14]++;
          } else if (compare[i] == 'Ser') {
              counts[15]++;
          } else if (compare[i] == 'Thr') {
              counts[16]++;
          } else if (compare[i] == 'Trp') {
              counts[17]++;
          } else if (compare[i] == 'Tyr') {
              counts[18]++;
          } else if (compare[i] == 'Val') {
              counts[19]++;
          }
      }
      var total = compare.length;
      var frequencies = [];
      for (var i = 0; i < 20; i++) {
          frequencies.push({name:amino[i], freq:(counts[i]/total), count: counts[i]});
      }
      return frequencies;

  }

  var addReferenceCodon= function(codon) {
      reference_codon.push(codon);
  };

  var getReferenceCodon = function(){
      return reference_codon;
  };

  var addReferenceAmino = function(amino) {
      reference_amino.push(amino);
  };

  var getReferenceAmino = function(){
      return reference_amino;
  };

  var addCompare1Codon= function(codon) {
      compare1_codon.push(codon);
  };

  var getCompare1Codon = function(){
      return compare1_codon;
  };

  var addCompare1Amino = function(amino) {
      compare1_amino.push(amino);
  };

  var getCompare1Amino = function(){
      return compare1_amino;
  };

  var addCompare1Color = function(codon) {
      compare1_color.push(codon);
  };

  var addInsertion1 = function(number) {
      for (var i = 0; i < number; i++) {
          compare1_color.push('red');
      }
  }

  var getCompare1Color = function(){
      return compare1_color;
  };


  var addCompare2Codon= function(codon) {
      compare2_codon.push(codon);
  };

  var getCompare2Codon = function(){
      return compare2_codon;
  };

  var addCompare2Amino = function(amino) {
      compare2_amino.push(amino);
  };

  var getCompare2Amino = function(){
      return compare2_amino;
  };

  var addCompare2Color= function(codon) {
      compare2_color.push(codon);
  };

  var getCompare2Color = function(){
      return compare2_color;
  };

  var addInsertion2 = function(number) {
      for (var i = 0; i < number; i++) {
          compare2_color.push('red');
      }
  }

  var addCompare3Codon= function(codon) {
      compare3_codon.push(codon);
  };

  var getCompare3Codon = function(){
      return compare3_codon;
  };

  var addCompare3Amino = function(amino) {
      compare3_amino.push(amino);
  };

  var getCompare3Amino = function(){
      return compare3_amino;
  };

  var addCompare3Color= function(codon) {
      compare3_color.push(codon);
  };

  var getCompare3Color = function(){
      return compare3_color;
  };

  var addInsertion3 = function(number) {
      for (var i = 0; i < number; i++) {
          compare3_color.push('red');
      }
  }

  var addCompare4Codon= function(codon) {
      compare4_codon.push(codon);
  };

  var getCompare4Codon = function(){
      return compare4_codon;
  };

  var addCompare4Amino = function(amino) {
      compare4_amino.push(amino);
  };

  var getCompare4Amino = function(){
      return compare4_amino;
  };

  var addCompare4Color= function(codon) {
      compare4_color.push(codon);
  };

  var getCompare4Color = function(){
      return compare4_color;
  };

  var addInsertion4 = function(number) {
      for (var i = 0; i < number; i++) {
          compare4_color.push('red');
      }
  }

  var setReferenceName = function(name) {
      reference_name = name;
  }

  var setCompare1Name = function(name) {
      compare1_name = name;
  }

  var setCompare2Name = function(name) {
      compare2_name = name;
  }

  var setCompare3Name = function(name) {
      compare3_name = name;
  }

  var setCompare4Name = function(name) {
      compare4_name = name;
  }

  return {
    clear: clear,
    addReferenceCodon: addReferenceCodon,
    getReferenceCodon: getReferenceCodon,
    addReferenceAmino: addReferenceAmino,
    getReferenceAmino: getReferenceAmino,
    addCompare1Codon: addCompare1Codon,
    getCompare1Codon: getCompare1Codon,
    addCompare1Amino: addCompare1Amino,
    getCompare1Amino: getCompare1Amino,
    addCompare1Color: addCompare1Color,
    getCompare1Color: getCompare1Color,
    addCompare2Codon: addCompare2Codon,
    getCompare2Codon: getCompare2Codon,
    addCompare2Amino: addCompare2Amino,
    getCompare2Amino: getCompare2Amino,
    addCompare2Color: addCompare2Color,
    getCompare2Color: getCompare2Color,
    addCompare3Codon: addCompare3Codon,
    getCompare3Codon: getCompare3Codon,
    addCompare3Amino: addCompare3Amino,
    getCompare3Amino: getCompare3Amino,
    addCompare3Color: addCompare3Color,
    getCompare3Color: getCompare3Color,
    addCompare4Codon: addCompare4Codon,
    getCompare4Codon: getCompare4Codon,
    addCompare4Amino: addCompare4Amino,
    getCompare4Amino: getCompare4Amino,
    addCompare4Color: addCompare4Color,
    getCompare4Color: getCompare4Color,
    addInsertion1: addInsertion1,
    addInsertion2: addInsertion2,
    addInsertion3: addInsertion3,
    addInsertion4: addInsertion4,
    getBarGraphInfo: getBarGraphInfo,
    getRelation: getRelation,
    setReferenceName: setReferenceName,
    setCompare1Name: setCompare1Name,
    setCompare2Name: setCompare2Name,
    setCompare3Name: setCompare3Name,
    setCompare4Name: setCompare4Name,
    allNames: allNames,
  };

});
