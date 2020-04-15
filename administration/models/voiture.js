let db = require('../../configDb');

module.exports.deleteEcurieVoiture= function (num,callback) {  // met l'écurie de la voiture à null
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "UPDATE voiture SET ECUNUM=NULL WHERE ECUNUM="+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};