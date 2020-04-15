let db = require('../../configDb');

module.exports.getFournPneu= function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT FPNUM,FPNOM, FPADRESSE FROM fourn_pneu ORDER BY FPNOM ASC";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getFournPneuEcurie= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT fourn_pneu.FPNUM,FPNOM FROM fourn_pneu JOIN ecurie ON fourn_pneu.FPNUM=ecurie.FPNUM  WHERE ECUNUM="+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ajoutFourn= function (nom,adresse,pays,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'INSERT INTO fourn_pneu (PAYNUM,FPNOM,FPADRESSE)'
                +' VALUES ('+pays+',"'+nom+'","'+adresse+'")';
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.deleteFourn= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'DELETE FROM fourn_pneu WHERE FPNUM='+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getFourn= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'SELECT FPNOM,FPADRESSE FROM fourn_pneu WHERE FPNUM='+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.modifierFourn= function (num,nom,adresse,pays,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'UPDATE fourn_pneu SET FPNOM="'+nom+'", FPADRESSE="'+adresse+'",PAYNUM='+pays+' WHERE FPNUM='+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};