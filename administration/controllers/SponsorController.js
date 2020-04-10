let async = require('async');
let model = require('../models/sponsors.js');
let modelEcurie = require('../models/ecurie.js');
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