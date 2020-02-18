let model = require('../models/pilote.js');
let async=require("async");
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = function (request, response) {
    let initial=request.params.lettre;
    response.title = 'Répertoire des pilotes';
    async.parallel([
        function(callback) {
            model.getListeInitialPilote(function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                response.listeLettre = result;
                response.render('repertoirePilotes', response);
            });
        }
    ],
        function(callback){
            model.getNomImagePilote(initial,)
        }
);
};

// //////////////////////// D E T A I L    D E S    P I L O T E S
module.exports.NomPilote = function (request, response) {
    let data = request.params.inital;
    response.title = 'Pilote dont le nom commence par ' + data;
    async.parallel([
            function (callback) {
                model.getListeInitialPilote(data, (function (errPil, resultPil) {
                    callback(null, resultPil)
                }));
                // pour afficher à nouveau les premières lettres des pilotes
            }, // fin callback1
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.listePilo = result[0]; // liste des premières lettres
            response.data = result[1]; // les pilotes dont le nom
            response.render('listePiloteNom', response);
        }  // fin fonction
    );  // fin async
};  // fin module