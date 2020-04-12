let async = require('async');
let modelGP = require('../models/grandprix.js');
let modelPoint = require('../models/points.js');
let modelPilote = require('../models/pilote.js');
let modelCourse = require('../models/course.js');
let modelEcurie = require('../models/ecurie.js');
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
module.exports.RedirectionSaisieResultat = function(request, response) {
	let num = request.body.gpnum;
	response.redirect("/resultats/saisieResultats/"+num);
}
module.exports.SaisieResultat = function(request, response){
	let gpnum = request.params.GPNUM;
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
	let gpnum = request.params.GPNUM;

	let pilnum = request.body.pilnum;
	let temps = request.body.temps;

	modelCourse.ajouterResultatPilote(gpnum,pilnum,temps, function(err, result){
		async.waterfall([
				function(callback){
					modelGP.getResultatGrandPrix(gpnum, function(err, result){
						callback(null, result);
					});
				},
				function(resPil,callback){
					modelPoint.getPoints(function(err, result){
						callback(null, resPil,result);
					});
				},
				function(resPil,points,callback){
					let table= resPil;
					table.forEach(function(element, index){
						if(points[index] === undefined){
							element.NBPOINT=0;
						} else {
							element.NBPOINT=points[index];
						}
					}, this);
					let index = 0;
					while(table[index].PILNUM != pilnum){
						index = index+1;
					}
					callback(null,table,index);
				},
				function(table,index,callback){
					if(index <= 9){ //verifie si c'est dans le temps des 10 premiers
						modelEcurie.getPoints(pilnum, function(err, result){
							let point =result[0].ECUPOINTS + table[index].NBPOINT.PTNBPOINTSPLACE;
							let ecunum = result[0].ECUNUM;
							modelEcurie.modifierPoints(point,ecunum,function(err, result){
								callback(null,table,index);
							});
						});
					}else{
						callback(null,null,null);
					}
				},
			],
			function (err,table,index){
				if(err) {
					console.log(err);
					return;
				}
				if(table != null && index != null && index < 9){ // Dans cette Partis on va mettre a jour les points des autres écuries en fonction du nouveau classement
					for(let i =index+1;i<table.length;i++){
						modelEcurie.getPoints(table[i].PILNUM,function(err, result) {
							console.log(result[0]);
							if(result[0] !== undefined) {//verifie qu'il y a un résultat de point
								let point;
								let ecunum = result[0].ECUNUM;
								if(i<=9){// pour les pilotes de 1 à 10
									point = result[0].ECUPOINTS - (table[i - 1].NBPOINT.PTNBPOINTSPLACE - table[i].NBPOINT.PTNBPOINTSPLACE);// recalcule les points de l'écurie
								} else{// pour les pilotes à 11
									point =result[0].ECUPOINTS - table[i - 1].NBPOINT.PTNBPOINTSPLACE;
								}
								modelEcurie.modifierPoints(point,ecunum);
							}
						});
					}
				}
				response.redirect("/resultats/saisieResultats/"+gpnum);

			}
		)
	});
};