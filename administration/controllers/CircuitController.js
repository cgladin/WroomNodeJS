let async = require('async');
let model = require('../models/circuit.js');
let modelPays = require('../models/pays.js');
let formidable = require('formidable');
// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuit = function(request, response){
    response.title = 'Liste des circuits';
    model.getCircuits(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.circuits = result;
        response.render('circuits/gestionCircuits', response);
    });
};
module.exports.AjoutCircuit = function(request, response){
    response.title = 'Liste des circuits';
    modelPays.getPays(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.pays = result;
        response.render('circuits/ajoutCircuit', response);
    });
};
module.exports.AjoutInfoCircuit = function (request,response) {
    console.log(request.files);
    let image = request.files.image;
    image.mv('../public/image/ecurie/'+image.name);
    let nom = request.body.nom;
    let longueur = request.body.longueur;
    let pays = request.body.pays;
    let nbspectateur = request.body.nbspectateur;
    let description = request.body.description;

    model.ajouterNouveauCircuit(nom,longueur,pays,image.name,nbspectateur,description, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        response.redirect('/circuits');
    });

};
module.exports.SupprimerCircuit = function (request, response) {
    num=request.params.CIRNUM;
    model.deleteCircuit(num, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        response.render('circuits/supprimer');
    });
};