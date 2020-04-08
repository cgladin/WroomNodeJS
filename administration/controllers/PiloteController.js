var async = require('async');
let model = require('../models/pilote.js');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.ListerPilote = 	function(request, response){
    model.getListePilote(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.pilotes = result;
        response.render('pilotes/gestionPilotes', response);
    });
  } ;
