let model = require('../models/grandprix.js');
let courseModel = require('../models/course.js');
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
				model.getNomGrandPrix(gpnum,function (err, result) {
					callback(null,result)
				})
			},
			function(callback){
				courseModel.getTempsCourse(gpnum, function (err,result) {
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
			response.listeGrandPrix = result[0];
			response.nomGrandPrix = result[1];
			response.listeResultat= result[2];
			response.render('detailGrandPrix', response);
		}  // fin fonction
	);  // fin async
};
