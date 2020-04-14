let model = require('../models/ecurie.js');
let voitureModel = require('../models/voiture.js');
let fournModel = require('../models/fourn_pneu.js');
let async=require("async");

   // //////////////////////// L I S T E R  E C U R I E S ///////////////////////////////////

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {  // Récupère les info pour lister les écurie
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        //console.log(result);
response.render('listerEcurie', response);
});
};
///////////////////// DETAIL CIRCUIT ////////////////////////////////////////////
module.exports.DetailEcurie=function (request, response) {
    let ecunum=request.params.ECUNUM; //récupération du numéro de l'écurie
response.title ='Détail de l\'écurie';
async.parallel([
    function (callback) {
        model.getListeEcurie(function (err, result) {// Récupère les info pour lister les écurie
            callback(null, result) // result[0]
        });
    },
    function (callback) {
        model.getDetailEcurie(ecunum,function (err, result) { // Récupère les info sur 1 écurie
            callback(null, result) //result[1]
        });
    },
        function (callback) {
            model.getEcuriePilote(ecunum,function (err, result) {// récupere les écurie liées à un pilote
                callback(null,result) //result[2]
            });
        },
        function (callback) {
            voitureModel.getImageVoiture(ecunum,function (err, result) { // Récupère les images des voitures de l'écurie
                callback(null, result) //result[3]
            });
        },
        function (callback) {
            fournModel.getFourn(ecunum,function (err, result) { // récupère le fournisseur de l'écurie
                callback(null, result) //result[4]
            });
        }
    ],
    function (err, result) {
        if(err){
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie=result[0];
        response.detailEcurie=result[1][0];
        response.ecuriePilote=result[2];
        response.photoVoiture=result[3];
        response.fournPneu=result[4][0];
        response.render('detailEcurie',response);
    }
);
};
