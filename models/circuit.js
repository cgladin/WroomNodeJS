let db = require('../configDb');

module.exports.getListeCircuit= function (callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT CIRNUM, CIRNOM, PAYADRDRAP FROM circuit c JOIN pays p ON c.PAYNUM=p.PAYNUM" ;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};