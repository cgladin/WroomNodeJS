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
    var image = request.files.image;

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