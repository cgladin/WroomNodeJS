let db = require('../configDb');
module.exports.getImageVoiture=function (ecunum,callback) { // Récupère les images des voitures d'une écurie
// connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT VOINOM, VOIADRESSEIMAGE, TYPELIBELLE FROM voiture v JOIN type_voiture t ON v.TYPNUM=t.TYPNUM WHERE ECUNUM="+ecunum;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};