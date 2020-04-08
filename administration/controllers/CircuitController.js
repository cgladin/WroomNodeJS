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
module.exports.ajoutCircuit = function(request, response){
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
module.exports.ajoutInfoCircuit = function (request,response) {
    var image = request.files.image;

};