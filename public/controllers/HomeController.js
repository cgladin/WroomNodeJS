let modelGP = require('../models/grandprix.js');
//////////////////////////////////////////////// A C C U E I L //////////////////////////////////////
module.exports.Index = function(request, response){
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    modelGP.getDernierResultat( function (err, result) { // Récupère le dernier résultat insérer dans la bd
        if (err) {
            console.log(err);
            return;
        }
        response.resultat = result[0];
        response.render('home', response);
    });
};
module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};
