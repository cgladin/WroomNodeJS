let async = require('async');
let modelGP = require('../models/grandprix.js');
  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){

	response.title = 'Liste des résulats des grands prix';
	modelGP.getListeGrandPrix(function(err, result) {
		if (err) {
			// gestion de l'erreur
			console.log(err);
			return;
		}
		response.listeGP = result;
		response.render('resultats/listeGP', response);
	});
};
module.exports.SaisieResultat = function(request, response){

	response.render('resultats/saisieResultat', response);
};
module.exports.SaisieInfoResultat = function(request, response){


};