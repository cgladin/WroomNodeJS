let model = require('../models/grandprix.js');
let async = require('async');
let modelCircuit = require('../models/circuit.js');
////////////////////////////// AFICHER LES GRANDPRIX ///////////////////////////////////////
module.exports.ListerGP = function (request, response) {
    response.title = 'Liste des grand prix';
    model.listerGP(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.gps = result;
        response.render('grandprix/gestionGP', response);
    });
};
///////////////////////////////AJOUTER GRANDPRIX ////////////////////////////////////////////////
// affiche la page d'ajout
module.exports.AjoutGP = function(request, response){
    modelCircuit.getCircuits(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.circuits = result;
        response.render('grandprix/ajoutGP', response);
    });
};
// modifie les informations
module.exports.AjoutInfoGP = function (request,response) {
    let nom = request.body.nom;
    let cirnum = request.body.circuit;
    let date = request.body.date;
    let tour = request.body.tour;
    let commentaire = request.body.commentaire;
    let buff = new Date();
    let annee = buff.getFullYear();
    let mois = buff.getMonth();
    let jour = buff.getDay();
    let heure = buff.getHours();
    let minute = buff.getMinutes();
    if(minute < 10){
        minute="0"+minute;
    }
    let datemaj = annee+"-"+mois+"-"+jour+" "+heure+":"+minute;

    model.ajouterNouveauGP(nom,cirnum,date,tour,datemaj,commentaire, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        response.ajout=1;
        response.render('grandprix/redirect', response);
    });

};
////////////////////////////////////////MODIFIER GP //////////////////////////////////////////////////
// affiche la page de modification
module.exports.ModifierGP = function (request, response) {
    num = request.params.GPNUM;
    async.parallel([

            function (callback) {
                model.getGP(num, function (err, result) {
                    callback(null, result)
                })
            },
            function (callback) {
                modelCircuit.getCircuits(function (err, result) {
                    callback(null, result)
                });
            }
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.gp = result[0][0];
            response.circuits=result[1];
            response.render('grandprix/modifier', response);
        }  // fin fonction
    );//fin async
};
// modifie les infos
module.exports.ModifierInfoGP = function (request, response) {
    num = request.params.GPNUM;
    let nom = request.body.nom;
    let cirnum = request.body.circuit;
    let date = request.body.date;
    let tour = request.body.tour;
    let commentaire = request.body.commentaire;
    let buff = new Date();
    let annee = buff.getFullYear();
    let mois = buff.getMonth();
    let jour = buff.getDay();
    let heure = buff.getHours();
    let minute = buff.getMinutes();
    if(minute < 10){
        minute="0"+minute;
    }
    let datemaj = annee+"-"+mois+"-"+jour+" "+heure+":"+minute;

    model.modifierGP(num,nom,cirnum,date,tour,datemaj,commentaire, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        response.modif=1;
        response.render('grandprix/redirect', response);
    });
};
/////////////////////////////// SUPPRIMER GP ///////////////////////////////////
module.exports.SupprimerGP = function (request, response) {
    num = request.params.GPNUM;
    model.supprimerGP(num,function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.supp=1;
        response.render('grandprix/redirect', response);
    });
};