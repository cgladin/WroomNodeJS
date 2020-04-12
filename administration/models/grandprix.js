let db = require('../configDb');

module.exports.getListeGrandPrix= function (callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNUM, GPNOM FROM grandprix ORDER BY GPNOM ASC";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getResultatGrandPrix= function (gpnum,callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, PILPRENOM, TEMPSCOURSE,p.PILNUM FROM grandprix g JOIN course c ON g.GPNUM=c.GPNUM " +
                "JOIN pilote p ON p.PILNUM = c.PILNUM " +
                "WHERE g.GPNUM = " + gpnum +" ORDER BY TEMPSCOURSE ASC";
            //console.log (sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};