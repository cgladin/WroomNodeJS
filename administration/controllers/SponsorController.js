let async = require('async');
let model = require('../models/sponsors.js');
let modelEcurie = require('../models/ecurie.js');
let modelFinance = require('../models/finance.js');
// //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerSponsor = function(request, response){
    response.title = 'Liste des résulats des grands prix';
    model.getSponsors(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.sponsors = result;
        response.render('sponsors/gestionSponsors', response);
    });
};
module.exports.AjoutSponsor = function(request, response){
    modelEcurie.getEcuries(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.ecuries= result;
        response.render('sponsors/ajoutSponsor', response);
    });
};
module.exports.AjoutInfoSponsor = function(request, response){
    let nom = request.body.nom;
    let sposectactivite = request.body.sposectactivite;
    let num = request.body.ecunum;
    async.waterfall([
            function (callback) {
                model.ajouterSponsor( nom,sposectactivite,function (err, result) {
                    callback(err, result)
                })
            },
            function(result, callback){
            let sponum = result.insertId;
                if(num !== undefined && num !== 'null' && num != 0){
                    modelFinance.ajoutSponsoriseEcurie(num,sponum, function (err, result) {
                        callback(err, result);
                    });
                }else{
                    callback();
                }
            },
    ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.ajout = 1;
            response.render('sponsors/redirect', response);
        }
    );//fin async
};
module.exports.SupprimerSponsor = function (request, response) {
    num=request.params.SPONUM;
    async.parallel([
            function (callback) {
                modelFinance.supprimerSponsoriseEcurie(num, function (err,res) {
                    callback(null,res)
                });
            },
            function (callback) {
                model.supprimerSponsor( num,function (err, result) {
                    callback(null, result)
                },50);
            },

        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.supp=1;
            response.render('sponsors/redirect', response);
        }// fin fonction
    );
};