var async = require('async');
let model = require('../models/pilote.js');
let modelPays = require('../models/pays.js');
let modelEcurie = require('../models/ecurie.js');
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
module.exports.AjoutPilote = 	function(request, response){
    async.parallel([
            function (callback) {
                modelPays.getNationalite( function (errPil, resultPil) {
                    callback(null, resultPil)
                });
            }, // fin callback1
            function (callback) {
                modelEcurie.getListeEcurie(function (err, result) {
                    callback(null,result)
                })
            }
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.nationalites = result[0]; // liste des nationnalites
            response.ecuries = result[1]; // liste des ecuries
            response.render('pilotes/ajoutPilote', response);
        }  // fin fonction
    );  // fin async
} ;
module.exports.AjoutInfoPilote = 	function(request, response){
    model.getListePilote(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.pilotes = result;
        response.render('pilotes/ajoutPilote', response);
    });
} ;