let async = require('async');
let modelGP = require('../models/grandprix.js');
let modelPoint = require('../models/points.js');
let modelPilote = require('../models/pilote.js');
  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerGP = function(request, response){

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
	var gpnum = request.body.gpnum;
	async.parallel([
			function(callback){
				modelGP.getResultatGrandPrix(gpnum, function(err, result){
					callback(null, result)
				});
			},
			function(callback){
				modelPoint.getPoints(function(err, result){
					callback(null, result)
				});
			},
			function(callback){
				modelPilote.getPiloteSansResultat(gpnum,function(err, result){
					callback(null, result)
				});
			},
		],
		function(err, result){
			if(err) {
				console.log(err);
				return;
			}
			let table= result[0];
			table.forEach(function(element, index){
				element.NBPOINT=result[1][index]
			}, this);
			response.resultatsGP= table;
			response.pilotes = result[2];
			response.gpnum=gpnum;
			response.render('resultats/saisieResultats', response);
		});
};
module.exports.SaisieInfoResultat = function(request, response){
	var num = request.params.GPNUM

};