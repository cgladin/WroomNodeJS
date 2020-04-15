let async = require('async');
let model = require('../models/fourn_pneu.js');
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

////////////////////////////////// SUPPRIMER FOURNISSEUR ////////////////////////////////

////////////////////////////////// MODIFIER FOURNISSEUR ////////////////////////////////