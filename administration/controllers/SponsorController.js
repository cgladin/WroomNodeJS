let async = require('async');
let model = require('../models/sponsors.js');
let modelEcurie = require('../models/ecurie.js');
let modelFinance = require('../models/finance.js');
let modelPays = require('../models/pays.js');
let modelPilote = require('../models/pilote.js');
let modelSponsorise = require('../models/sponsorise.js');
// //////////////////////////L I S T E R    R E S U L T A T S //////////////////////////////////////////
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
/////////////////////////////////////// AJOUTER SPONSOR //////////////////////////////////////////////
// affiche la page d'ajout
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
// ajoute les infos
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
/////////////////////////////////////SUPPRIMER SPONSOR ////////////////////////////////////////////
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
/////////////////////////////////////////// MODIFIER SPONSOR ////////////////////////////////
// modifie les infos
module.exports.ModifierInfoSponsor = function(request, response){
    sponum=request.params.SPONUM;
    let nom = request.body.nom;
    let sposectactivite = request.body.sposectactivite;
    let num = request.body.ecunum;
    async.parallel([
            function(callback){
                modelFinance.supprimerSponsoriseEcurie(sponum, function (err, result) {
                    callback(err, result);
                });
            },
            function(callback){
                if(num !== undefined && num !== 'null' && num != 0){
                    modelFinance.ajoutSponsoriseEcurie(num,sponum, function (err, result) {
                        callback(err, result);
                    });
                }else{
                    callback();
                }
            },
            function (callback) {
                model.modifierSponsor( nom,sposectactivite,sponum,function (err, result) {
                    callback(err, result)
                })
            },
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.modif = 1;
            response.render('sponsors/redirect', response);
        }
    );//fin async
};
// affiche la page de modification
module.exports.ModifierSponsor= function(request, response){
    num=request.params.SPONUM;
    async.parallel([
            function (callback) {
                model.getSponsor(num,function (err,result) {
                    callback(null,result)
                })
            },
            function (callback) {
                modelEcurie.getEcuries(function (err, result) {
                    callback(null, result)
                });
            },
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.sponsor=result[0][0];
            response.ecuries=result[1];
            response.render('sponsors/modifier', response);
        }  // fin fonction
    );//fin async
};
/////////////////////////////////////SPONSORISE UN PILOTE //////////////////////////////////////////////
//affiche la page
module.exports.SponsorisePilote = function(request, response){
    async.parallel([
            function(callback){
                model.getSponsors(function (err, result) {
                    callback(err, result);
                });
            },
            function (callback) {
                modelPilote.getListePilote( function (err, result) {
                    callback(err, result)
                })
            },
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.sponsors =result[0];
            response.pilotes =result[1];
            response.render('sponsors/ajoutSponsorise', response);
        }
    );//fin async
};
/// ajoute les informations
module.exports.AjoutSponsorisePilote = function(request, response){
    let pilnum = request.body.pilote;
    let sponsor = request.body.sponsor;
    modelSponsorise.ajoutSponsorisePilote(pilnum,sponsor,function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.sponso= 1;
        response.render('sponsors/redirect', response);
    });
};
///////////////////// lister pilotes sponsorisé /////////////////////////
module.exports.GestionSponsorise= function(request, response){
    num=request.params.SPONUM;
    async.parallel([
            function (callback) {
                model.getNomSponsor(num,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                modelSponsorise.getPiloteSponsorise(num,function (err,result) {
                    callback(null,result)
                })
            },
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.sponsor=result[0][0];
            response.pilotes=result[1];
            response.render('sponsors/gestionSponsorise', response);
        }  // fin fonction
    );//fin async
};
//////////////////// Supprimer pilote sponsorisé //////////////////////////////////////////////
module.exports.SupprimerSponsorise = function(request, response){
    let pilnum = request.body.pilnum;
    let sponsor = request.body.sponsor;
    console.log(sponsor);
    modelSponsorise.deletePiloteSponsor(pilnum,sponsor,function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.redirect('/sponsors/gestionSponsorise/'+sponsor);
    });
};