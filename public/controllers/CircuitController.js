let model = require('../models/circuit.js');
let async=require("async");
//////////////////////// L I S T E R     C I R C U I T S//////////////////////////
module.exports.ListerCircuit = function(request, response){
    response.title = 'Liste des circuits';
    model.getListeCircuit(function (err, result) { // Récupère les info pour le tableau qui liste les circuits
        if (err) {
            console.log(err);
            return;
        }
        response.listeCircuit = result;
        response.render('listerCircuit', response);
    });
};
//////////////// DETAIL CIRCUIT/////////////////////
module.exports.DetailCircuit=function (request, response) {
    let num = request.params.CIRNUM; //récupération du numéro du circuit
    async.parallel([
            function (callback) {
                model.getListeCircuit(function (err,result) { // Récupère les info pour le tableau qui liste les circuits
                    callback(null,result) // result[0]
                })
            },
            function (callback) {
                model.getDetailCircuit(num,function (err,result) { // Récupère les info du circuit
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
            response.listeCircuit=result[0];
            response.detailCircuit=result[1][0];
            response.render('detailCircuit', response);
        }
    );
};
