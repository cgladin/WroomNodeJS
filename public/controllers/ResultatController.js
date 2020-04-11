let model = require('../models/grandprix.js');
let courseModel = require('../models/course.js');
let modelPoint = require('../models/points.js');
let async=require("async");
  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){
	response.title = 'Liste des résulats des grands prix';
	model.getListeGrandPrix(function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		response.listeGrandPrix = result;
		response.render('listerResultat', response);
	});
};
module.exports.DetailGrandPrix= function (request, response) {
	let gpnum = request.params.GPNUM;
	async.parallel([
			function (callback) {
				model.getListeGrandPrix( function (err, result) {
					callback(null, result)
				});
			},
			function (callback) {
				model.getDetailGrandPrix(gpnum,function (err, result) {
					callback(null,result)
				})
			},
			function (callback) {
				model.getCommentaireGP(gpnum,function (err, result) {
					callback(null,result)
				})
			},

			function (callback) {
				modelPoint.getPoints(function (err, result) {
					callback(null,result)
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
			table.forEach(function(element, index){
				element.NBPOINT=result[3][index]
			}, this);
			console.log(table);
			response.listeGrandPrix = result[0];
			response.detailGrandPrix = table;
			response.commentaire= result[2][0];
			response.render('detailGrandPrix', response);
		}  // fin fonction
	);  // fin async
};
