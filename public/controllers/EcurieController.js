let model = require('../models/ecurie.js');
let voitureModel = require('../models/voiture.js');
let fournModel = require('../models/fourn_pneu.js');
let photoModel = require('../models/photo.js');
let async=require("async");

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
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

module.exports.DetailEcurie=function (request, response) {
    let ecunum=request.params.ECUNUM;
response.title ='Détail de l\'écurie';
async.parallel([
    function (callback) {
        model.getListeEcurie(function (err, result) {
            callback(null, result)
        });
    },
    function (callback) {
        model.getDetailEcurie(ecunum,function (err, result) {
            callback(null, result)
        });
    },
        function (callback) {
            model.getEcuriePilote(ecunum,function (err, result) {
                callback(null,result)
            });
        },
        function (callback) {
            voitureModel.getImageVoiture(ecunum,function (err, result) {
                callback(null, result)
            });
        },
        function (callback) {
            fournModel.getFourn(ecunum,function (err, result) {
                callback(null, result)
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
