var async = require('async');
let model = require('../models/pilote.js');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.ListerPilote = 	function(request, response){

      response.render('pilotes/gestionPilotes', response);
  } ;
