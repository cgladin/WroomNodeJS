let db = require('../configDb');
module.exports.getTempsCourse= function (gpnum,callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT TEMPSCOURSE FROM course WHERE GPNUM="+gpnum;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};