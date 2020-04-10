let model = require('../models/ecurie.js');
let modelPays = require('../models/pays.js');
let modelFP = require('../models/fourn_pneu.js');
let modelVoiture = require('../models/voiture.js');
let modelFinance = require('../models/finance.js');
let modelPilote = require('../models/pilote.js');
let async = require('async');
let formidable = require('formidable');
var fs = require('fs');

// //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function (request, response) {
    response.title = 'Liste des écuries';
    model.getListeEcurie(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.ecuries = result;
        response.render('ecuries/gestionEcuries', response);
    });
};
module.exports.AjoutEcurie = function (request, response) {
    response.title = 'Liste des écuries';
    async.parallel([
        function (callback) {
            modelPays.getPays(function (err, result) {
                callback(null,result)
            });
        },
        function (callback) {
            modelFP.getFournPneu(function (err, result) {
                callback(null,result)
            });
        }
    ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.pays = result[0];
            response.fournPneu = result[1];
            response.render('ecuries/ajoutEcurie', response);
        }
    );//fin async
};
module.exports.AjoutInfoEcurie = function (request, response) {
    let nom = request.body.nom;
    let directeur = request.body.directeur;
    let adresse = request.body.adresse;
    let point = request.body.point;
    let pays = request.body.pays;
    let fournPneu = request.body.fournPneu;
    let image = request.files.image;
    if(point == ""){ // met la valeur null si l'ecurie n'a pas de points
        point = "NULL";
    }
    image.mv('../public/public/image/ecurie/'+image.name);

    model.ajouterNouvelleEcurie(nom,directeur,adresse,point,pays,fournPneu,image.name, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        response.ajout=1;
        response.render('ecuries/redirect', response);
    });

};
module.exports.SupprimerEcurie = function (request, response) {
    num=request.params.ECUNUM;
    async.parallel([
            function (callback) {
                model.getImage( num,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                modelPilote.deleteEcuriePilote(num, function (err,res) {
                    callback(null,res)
                });
            },
            function (callback) {
                modelVoiture.deleteEcurieVoiture(num, function (err,res) {
                    callback(null,res)
                });
            },
            function (callback) {
                modelFinance.deleteEcurieFinance(num, function (err,res) {
                    callback(null,res)
                });
            },
            function (callback) {
                model.deleteEcurie(num, function (err,res) {
                    callback(null,res)
                },50);
            },

        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            fs.unlink('../public/public/image/ecurie/'+result[0][0].ECUADRESSEIMAGE, function (err) {
                if (err) throw err;
            });
            response.supp=1;
            response.render('ecuries/redirect', response);
        }// fin fonction
    );
};
module.exports.ModifierEcurie = function(request, response){
    num=request.params.ECUNUM;
    async.parallel([
            function (callback) {
                model.getEcurie(num,function (err,result) {
                    callback(null,result)
                })
            },
            function (callback) {
                modelPays.getPaysEcurie(num,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                modelPays.getPays(function (err, result) {
                    callback(null,result)
                })
            },
            function (callback) {
                modelFP.getFournPneu(function (err, result) {
                    callback(null,result)
                });
            },
            function (callback) {
                modelFP.getFournPneuEcurie(num,function (err, result) {
                    callback(null,result)
                });
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
            response.ecurie=result[0][0];
            response.ecuPays=result[1][0];
            response.pays=result[2];
            response.fournPneu=result[3];
            response.ecuFP=result[4][0];
            response.image=result[5][0];
            response.render('ecuries/modifier', response);
        }  // fin fonction
    );//fin async
} ;
module.exports.ModifierInfoEcurie = function(request, response){
    let nom = request.body.nom;
    let directeur = request.body.directeur;
    let adresse = request.body.adresse;
    let point = request.body.point;
    let pays = request.body.pays;
    let fournPneu = request.body.fournPneu;
    let oldImage = request.body.oldImage;
    if(point === ""){ // met la valeur null si l'ecurie n'a pas de points
        point = "NULL";
    }
    let image =request.files;
    if(image == null){
        image=oldImage;
        oldImage=true;
    }else {
        image=request.files.image;
        image.mv('../public/public/image/ecurie/'+image.name);
        image= image.name;
    }
    async.parallel([
            function (callback) {
                model.getImage( num,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.ModifierEcurie(num,nom,directeur,adresse,point,pays,fournPneu,image, function (err) {
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
            if(oldImage !== true){
                fs.unlink('../public/public/image/ecurie/'+result[0][0].ECUADRESSEIMAGE, function (err) {
                    if (err) throw err;
                });
            }
            response.modif=1;
            response.render('ecuries/redirect', response);
        }  // fin fonction
    );//fin async
};