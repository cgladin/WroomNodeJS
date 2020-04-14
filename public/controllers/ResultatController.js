let model = require('../models/grandprix.js');
let modelPoint = require('../models/points.js');
let async=require("async");
  ////////////////////////////L I S T E R    R E S U L T A T S ///////////////////////////////////
module.exports.ListerResultat = function(request, response){
	response.title = 'Liste des résulats des grands prix';
	model.getListeGrandPrix(function (err, result) { //récupère la liste des grandprix
		if (err) {
			console.log(err);
			return;
		}
		response.listeGrandPrix = result;
		response.render('listerResultat', response);
	});
};
////////////////////// DETAIL GRAND PRIX //////////////////////////////////////////
module.exports.DetailGrandPrix= function (request, response) {
	let gpnum = request.params.GPNUM;
	async.parallel([
			function (callback) {
				model.getListeGrandPrix( function (err, result) {//Récupère la liste des grandprix
					callback(null, result) //result[0]
				});
			},
			function (callback) {
				model.getDetailGrandPrix(gpnum,function (err, result) { //Récupère les info d'un grand prix
					callback(null,result)//result[1]
				})
			},
			function (callback) {
				model.getCommentaireGP(gpnum,function (err, result) { //Récupère le commentaire d'un grand prix
					callback(null,result)//result[2]
				})
			},

			function (callback) {
				modelPoint.getPoints(function (err, result) { // Récupère les points dans la table de points
					callback(null,result)//result[3]
				})
			}
		],
		function (err, result) {
			if (err) {
				// gestion de l'erreur
				console.log(err);
				return;
			}
			let table = result[1];
			table.forEach(function(element, index){ // Permet d'ajouter dans le tableau résultat du grand prix la table points
				element.NBPOINT=result[3][index]
			}, this);
			response.listeGrandPrix = result[0];
			response.detailGrandPrix = table;
			response.commentaire= result[2][0];
			response.render('detailGrandPrix', response);
		}  // fin fonction
	);  // fin async
};
