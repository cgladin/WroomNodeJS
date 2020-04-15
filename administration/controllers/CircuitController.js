let async = require('async');
let model = require('../models/circuit.js');
let modelPays = require('../models/pays.js');
let modelGP = require('../models/grandprix.js');
let formidable = require('formidable');
var fs = require('fs');
// ////////////////////// L I S T E R     C I R C U I T S /////////////////////

module.exports.ListerCircuit = function(request, response){
    response.title = 'Liste des circuits';
    model.getCircuits(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.circuits = result;
        response.render('circuits/gestionCircuits', response);
    });
};
/////////////////////////////AJOUT CIRCUIT ////////////////////////////////////////////
// affichage de la page
module.exports.AjoutCircuit = function(request, response){
    response.title = 'Liste des circuits';
    modelPays.getPays(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.pays = result;
        response.render('circuits/ajoutCircuit', response);
    });
};
// Ajout des info
module.exports.AjoutInfoCircuit = function (request,response) {
    let image = request.files.image;
    image.mv('../public/public/image/circuit/'+image.name);
    let nom = request.body.nom;
    let longueur = request.body.longueur;
    let pays = request.body.pays;
    let nbspectateur = request.body.nbspectateur;
    let description = request.body.description;

    model.ajouterNouveauCircuit(nom,longueur,pays,image.name,nbspectateur,description, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        response.ajout=1;
        response.render('circuits/redirect', response);
    });

};
//////////////////////////// SUPPRIMER CIRCUIT ///////////////////////////
module.exports.SupprimerCircuit = function (request, response) {
    num=request.params.CIRNUM;
    async.parallel([
            function (callback) {
                model.getImage( num,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                modelGP.getCirGP(num,function (err,res) {
                    callback(null,res)
                });
            }
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            if(result[1] !== undefined) {
                for(let i=0;i<result[1].length;i++){
                    let gpnum = result[1][i].GPNUM;
                    modelGP.supprimerGP(gpnum);
                }
            }
            model.deleteCircuit(num); //supprime le circuit après suppressions des grandprix
            fs.unlink('../public/public/image/circuit/'+result[0][0].CIRADRESSEIMAGE, function (err) {
                if (err) throw err;
            });
            response.supp=1;
            response.render('circuits/redirect', response);
        }// fin fonction
    );
};
////////////////////////////////////////////////// MODIFIER CIRCUIT //////////////////////////////////////////
// modifie les infos du circuit
module.exports.ModifierInfoCircuit = function (request,response) {
    num=request.params.CIRNUM;

    let oldImage=request.body.oldImage;
    let nom = request.body.nom;
    let longueur = request.body.longueur;
    let pays = request.body.pays;
    let nbspectateur = request.body.nbspectateur;
    let description = request.body.description;

    let image =request.files;
    if(image == null){
        image=oldImage;
        oldImage=true;
    }else {
        image=request.files.image;
        image.mv('../public/public/image/circuit/'+image.name);
        image= image.name;
    }
    async.parallel([
            function (callback) {
                model.getImage( num,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.ModifierCircuit(num,nom,longueur,pays,image,nbspectateur,description, function (err) {
                    callback(null)
                },50);
            }
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            if(oldImage !== true) {
                fs.unlink('../public/public/image/circuit/' + result[0][0].CIRADRESSEIMAGE, function (err) {
                    if (err) throw err;
                });
            }
            response.modif=1;
            response.render('circuits/redirect', response);
        }  // fin fonction
    );//fin async
};
// affiche la page de modification
module.exports.ModifierCircuit = function(request, response){
    num=request.params.CIRNUM;
    async.parallel([
            function (callback) {
                model.getCircuit(num,function (err,result) {
                    callback(null,result)
                })
            },
            function (callback) {
                modelPays.getPaysCircuit(num,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                modelPays.getPays(function (err, result) {
                    callback(null,result)
                })
            },
            function (callback) {
                model.getImage( num,function (err, result) {
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
            response.circuit=result[0][0];
            response.cirPays=result[1][0];
            response.pays=result[2];
            response.image=result[3][0];
            response.render('circuits/modifier', response);
        }  // fin fonction
    );//fin async
} ;