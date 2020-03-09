let db = require('../configDb');

module.exports.getListeGrandPrix= function (callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNUM, GPNOM, PAYNOM, PAYADRDRAP FROM grandprix g JOIN circuit c ON g.CIRNUM=c.CIRNUM JOIN pays p ON c.PAYNUM=p.PAYNUM";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getNomGrandPrix= function (gpnum,callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNOM, GPDATE, GPCOMMENTAIRE FROM grandprix WHERE GPNUM="+gpnum;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};