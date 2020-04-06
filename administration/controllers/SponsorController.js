// //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerSponsor = function(request, response){

    response.title = 'Liste des résulats des grands prix';

    response.render('gestionSponsors', response);
};
