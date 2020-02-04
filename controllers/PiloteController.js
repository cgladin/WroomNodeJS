let model = require('../models/pilote.js');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des pilotes';
    model.getRepertoire(function(err, result){
      if(err){
        console.log(err);
        return;
      }
      reponse.repertoire = result;
      response.render('repertoirePilotes', response);
    });
  } ;
