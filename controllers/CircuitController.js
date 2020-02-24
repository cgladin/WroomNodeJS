let model = require('../models/circuit.js');
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
}
