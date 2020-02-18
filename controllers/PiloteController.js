let model = require('../models/pilote.js');
let async=require("async");
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S
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

//module affiche recherche pilote
module.exports.NomPilote = function (request, response) {
    let data = request.params.initial;
    response.title = 'Pilote dont le nom commence par ' + data;
    async.parallel([
            function (callback) {
                model.getListeInitialPilote( function (errPil, resultPil) {
                    callback(null, resultPil)
                });
                // pour afficher à nouveau les premières lettres des pilotes
            }, // fin callback1
            function (callback) {
                model.getNomImagePilote(data,function (err, result) {
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
            response.listeLettre = result[0]; // liste des premières lettres
            response.pilotes = result[1]; // les pilotes dont le nom
            response.render('resultatRepertoirePilote', response);
        }  // fin fonction
    );  // fin async
};  // fin module

// ////////////// Détail pilotes ////////////////////////
module.exports.DetailPilote = function (request,response) {

};