let model = require('../models/pilote.js');
let photoModel = require('../models/photo.js');
let ecurieModel = require('../models/ecurie.js');
let async=require("async");
/////////////////////////// R E P E R T O I R E    D E S    P I L O T E S ///////////////////////////////
module.exports.Repertoire = function (request, response) {
    response.title = 'Répertoire des pilotes';
    model.getListeInitialPilote(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeLettre = result;
        response.render('repertoirePilotes', response);
    });
};

/////////////////////////////////// affiche le resultat de la recherche des pilotes ///////////////////////////////////////
module.exports.NomPilote = function (request, response) {
    let data = request.params.initial;
    response.title = 'Pilote dont le nom commence par ' + data;
    async.parallel([
            function (callback) {
                model.getListeInitialPilote( function (err, result) { // pour afficher à nouveau les premières lettres des pilotes
                    callback(null, result) // result[0]
                });
            },
            function (callback) {
                model.getNomImagePilote(data,function (err, result) { // Récupère les images et nom des pilotes en fonction de la lettre selectionné
                    callback(null,result) // result[1]
                })
            }
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.listeLettre = result[0]; // liste des premières lettres
            response.pilotes = result[1]; // les pilotes dont le nom
            response.render('resultatRepertoirePilote', response);
        }  // fin fonction
    );  // fin async
};  // fin module

//////////////// Détail pilotes ////////////////////////
module.exports.DetailPilote = function (request,response) {
    let pilnum = request.params.PILNUM;
    response.title=' Détails du pilote';
    async.parallel([
            function(callback){
                model.getListeInitialPilote(function (err, result) { //Récupère les initales des pilotes dans la bd pour la recherche
                    callback(null, result) //result[0]
                });
            },
            function (callback) {
                model.getDetailPilotePerso(pilnum, function (err,result) { // Récupère les infos d'un pilote
                    callback(null,result) //result[1]
                });
            },
            function (callback) {
                model.getDetailPiloteSponsor(pilnum,function (err,result) { // Récupère les info sur les sponsors du pilote
                    callback(null,result)//result[2]
                });
            },
            function (callback) {
                photoModel.getPhotoNonOfficiel(pilnum, function (err,result) { // Récupère les images du pilote autre que ça photo officiel
                    callback(null,result) // result[3]
                });
            },
            function (callback) {
                photoModel.getPhotoOfficiel(pilnum, function (err,result) { // Récupère l'image officiel du pilote
                    callback(null,result) //result[4]
                });
            },
            function (callback) {
                ecurieModel.getNomEcurie(pilnum, function (err,result) { // Récupère l'écurie du pilote
                    callback(null,result) //result[5]
                });
            }
        ],
        function(err,result){
            if(err){
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.listeLettre=result[0];
            response.detailPerso=result[1][0];
            response.detailSponsor=result[2];
            response.photosNonOfficiel=result[3];
            response.photoOfficiel=result[4][0];
            response.nomEcurie=result[5];
            response.render('detailPilote',response);
        }
    );
};