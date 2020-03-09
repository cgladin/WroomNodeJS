let model = require('../models/circuit.js');
let async=require("async");
// ////////////////////// L I S T E R     C I R C U I T S
module.exports.ListerCircuit = function(request, response){
    response.title = 'Liste des circuits';
    model.getListeCircuit(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeCircuit = result;
        response.render('listerCircuit', response);
    });
};
module.exports.DetailCircuit=function (request, response) {
let num = request.params.CIRNUM;
    async.parallel([
    function (callback) {
        model.getListeCircuit(function (err,result) {
            callback(null,result)
        })
    },
        function (callback) {
            model.getDetailCircuit(num,function (err,result) {
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
            response.listeCircuit=result[0];
            response.detailCircuit=result[1][0];
            response.render('detailCircuit', response);
        }
    );
};
