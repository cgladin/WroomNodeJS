let model = require('../models/ecurie.js');
let modelPays = require('../models/pays.js');
let modelFP = require('../models/fourn_pneu.js');
let async = require('async');
let formidable = require('formidable');

// //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function (request, response) {
    response.title = 'Liste des écuries';
    model.getListeEcurie(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.ecuries = result;
        response.render('ecuries/gestionEcuries', response);
    });
};
module.exports.AjoutEcurie = function (request, response) {
    response.title = 'Liste des écuries';
    async.parallel([
        function (callback) {
            modelPays.getPays(function (err, result) {
                callback(null,result)
            });
        },
        function (callback) {
            modelFP.getFournPneu(function (err, result) {
                callback(null,result)
            });
        }
    ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.pays = result[0];
            response.fournPneu = result[1];
            response.render('ecuries/ajoutEcurie', response);
        }
    );//fin async
};
module.exports.AjoutInfoEcurie = function (request, response) {
    let nom = request.body.nom;
    let directeur = request.body.directeur;
    let adresse = request.body.adresse;
    let point = request.body.point;
    let pays = request.body.pays;
    let fournPneu = request.body.fournPneu;
    let image = request.files.image;
    if(point == ""){ // met la valeur null si l'ecurie n'a pas de points
        point = "NULL";
    }
    image.mv('../public/public/image/ecurie/'+image.name);

    model.ajouterNouvelleEcurie(nom,directeur,adresse,point,pays,fournPneu,image.name, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        response.ajout=1;
        response.render('ecuries/redirect', response);
    });

};