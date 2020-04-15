let db = require('../../configDb');

module.exports.getSponsors= function (callback) { // donne tous les sponsors
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT SPONUM,SPONOM,SPOSECTACTIVITE FROM sponsor ORDER BY SPONOM ASC";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getSponsor= function (num,callback) { // donne 1 sponsor avec un numero
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT SPONUM,SPONOM,SPOSECTACTIVITE FROM sponsor WHERE SPONUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ajouterSponsor= function (nom,sposectactivite, callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'INSERT INTO sponsor (SPONOM,SPOSECTACTIVITE) VALUES ("'+nom+'","'+sposectactivite+'")';
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.supprimerSponsor= function (num, callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM sponsor WHERE SPONUM="+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.modifierSponsor = function(sponom,sposectactivite,sponum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'UPDATE sponsor SET sponom = "'+sponom + '", sposectactivite = "'+sposectactivite+ '" WHERE sponum = ' + sponum;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    })
};
module.exports.getNomSponsor= function (num,callback) { // donne 1 sponsor avec un numero
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT SPONUM,SPONOM FROM sponsor WHERE SPONUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};