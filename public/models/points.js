let db = require('../configDb');
module.exports.getPoints=function (callback) { // Récupère les points
// connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT PTNBPOINTSPLACE FROM points ORDER BY PTNBPOINTSPLACE DESC";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};