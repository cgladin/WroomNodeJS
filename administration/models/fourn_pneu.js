let db = require('../configDb');

module.exports.getFournPneu= function (callback) { //donne la liste des circuits
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT FPNUM,FPNOM FROM fourn_pneu ORDER BY FPNOM ASC";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getFournPneuEcurie= function (num,callback) { //donne la liste des circuits
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT fourn_pneu.FPNUM,FPNOM FROM fourn_pneu JOIN ecurie ON fourn_pneu.FPNUM=ecurie.FPNUM  WHERE ECUNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};