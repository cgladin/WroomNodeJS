let async = require('async');
let model = require('../models/fourn_pneu.js');
let modelEcurie = require('../models/ecurie.js');
let modelPays = require('../models/pays.js');
////////////////////////////// LISTER LES FOURNISSEURS /////////////////////////////////////
module.exports.ListerFournisseur = function (request, response) {
    response.title = 'Liste des fournisseurs';
    model.getFournPneu(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.fournisseurs = result;
        response.render('fournisseurs/gestionFourn', response);
    });
};
//////////////////////////////// AJOUTER FOURNISSEUR ///////////////////////////////////
//affiche la page d'ajout
module.exports.AjoutFourn = function(request, response){
    modelPays.getPays(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.pays = result;
        response.render('fournisseurs/ajoutFourn', response);
    });
};
//ajoute les infos
module.exports.AjoutInfoFourn = function(request, response){
    let nom = request.body.nom;
    let adresse = request.body.adresse;
    let pays = request.body.pays;
    model.ajoutFourn(nom,adresse,pays,function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.ajout=1;
        response.render('fournisseurs/redirect', response);
    });
};
////////////////////////////////// SUPPRIMER FOURNISSEUR ////////////////////////////////
module.exports.SupprimerFournisseur = function (request, response) {
   let  num=request.params.FPNUM;
    modelEcurie.updateEcurieFourn( num,function () {
        model.deleteFourn(num,function (err,) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.supp=1;
            response.render('fournisseurs/redirect', response);
        });
    });
};
////////////////////////////////// MODIFIER FOURNISSEUR ////////////////////////////////
// affiche la page de modif
module.exports.ModifierFournisseur = function (request, response) {
    let num=request.params.FPNUM;

    async.parallel([
            function (callback) {
                modelPays.getPays(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                modelPays.getFournPays(num,function (err,res) {
                    callback(null,res)
                });
            },
            function (callback) {
                model.getFourn(num,function (err,res) {
                    callback(null,res)
                });
            },
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.pays = result[0];
            response.fournPays = result[1][0];
            response.fourn = result[2][0];
            response.render('fournisseurs/modifier', response);
        }// fin fonction
    );
};
// modifie les infos
module.exports.ModifierInfoFournisseur = function (request, response) {
    let  num=request.params.FPNUM;
    let nom = request.body.nom;
    let adresse = request.body.adresse;
    let pays = request.body.pays;
    model.modifierFourn(num,nom,adresse,pays,function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.modif=1;
        response.render('fournisseurs/redirect', response);
    });
};