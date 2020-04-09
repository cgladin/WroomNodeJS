var async = require('async');
let model = require('../models/pilote.js');
let modelPays = require('../models/pays.js');
let modelEcurie = require('../models/ecurie.js');
let modelEssais = require('../models/essais.js');
let modelCourse = require('../models/course.js');
let modelPhoto = require('../models/photo.js');
let modelSponsorise = require('../models/sponsorise.js');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.ListerPilote = 	function(request, response){
    model.getListePilote(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.pilotes = result;
        response.render('pilotes/gestionPilotes', response);
    });
  } ;
module.exports.AjoutPilote = 	function(request, response){
    async.parallel([
            function (callback) {
                modelPays.getNationalite( function (errPil, resultPil) {
                    callback(null, resultPil)
                });
            }, // fin callback1
            function (callback) {
                modelEcurie.getListeEcurie(function (err, result) {
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
            response.nationalites = result[0]; // liste des nationnalites
            result[1].push({ECUNUM:0,ECUNOM:"Aucune"}); //ajout de la possibilite de ne pas avoir d'écurie
            response.ecuries = result[1]; // liste des ecuries
            response.render('pilotes/ajoutPilote', response);
        }  // fin fonction
    );  // fin async
} ;
module.exports.AjoutInfoPilote = 	function(request, response){
    //récupération des données insérées
    let prenom=request.body.prenom;
    let nom=request.body.nom;
    let date=request.body.date;
    let nationalite=request.body.nationalite;
    let ecurie=request.body.ecurie;
    let point=request.body.point;
    let poid=request.body.poid;
    let taille=request.body.taille;
    let description=request.body.description;
    if(ecurie == 0){ //met la valeur nulle si la valeur aucune ecurie est sélectionnée
        ecurie = "NULL";
    }
    if(point == ""){ // met la valeur null si le pilote n'a pas de points
        point = "NULL";
    }

    model.ajouterNouveauPilote(prenom,nom,date,nationalite,ecurie,point,poid,taille,description, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        response.redirect('/pilotes');
    });

} ;
module.exports.SupprimerPilote = 	function(request, response){
  num=request.params.PILNUM;
async.parallel([
    function (callback) {
        model.deletePilote(num, function (err,result) {
            callback(null,result)
        })
    },
    function (callback) {
        modelEssais.deleteEssaisPilote(num,function (err, result) {
            callback(null,result)
        })
    },
    function (callback) {
        modelCourse.deleteCoursePilote(num,function (err, result) {
            callback(null,result)
        })
    },
    function (callback) {
        modelPhoto.deletePhotoPilote(num,function (err, result) {
            callback(null,result)
        })
    },
    function (callback) {
        modelSponsorise.deleteSponsorPilote(num,function (err, result) {
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
        response.render('pilotes/supprimer');
    }  // fin fonction
    );//fin async
} ;
module.exports.ModifierPilote = 	function(request, response){
    num=request.params.PILNUM;
    async.parallel([
            function (callback) {
                model.getPilote(num, function (err,result) {
                    callback(null,result)
                })
            },
            function (callback) {
                modelPays.getNationalite( function (errPil, resultPil) {
                    callback(null, resultPil)
                });
            },
            function (callback) {
                modelEcurie.getListeEcurie(function (err, result) {
                    callback(null,result)
                })
            },
            function (callback) {
                modelPays.getNatPilote( num,function (errPil, resultPil) {
                    callback(null, resultPil)
                });
            },
            function (callback) {
                modelEcurie.getEcuriePilote(num,function (err, result) {
                    callback(null,result)
                })
            },
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.pilote = result[0][0];
            response.nationalites = result[1];
            result[2].push({ECUNUM:0,ECUNOM:"Aucune"}); //ajout de la possibilite de ne pas avoir d'écurie
            response.ecuries = result[2];
            response.natPilote=result[3][0];
            response.ecuriePilote=result[4][0];
            response.render('pilotes/modifier', response);
        }  // fin fonction
    );//fin async
} ;

module.exports.ModifierInfoPilote = 	function(request, response){

};