let db = require('../configDb');
module.exports.getFourn= function (ecunum, callback){ // Récupère le fournisseur d'une écurie
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT FPNOM FROM fourn_pneu f JOIN ecurie e ON f.FPNUM=e.FPNUM WHERE ECUNUM= " + ecunum;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};