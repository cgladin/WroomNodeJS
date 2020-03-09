let db = require('../configDb');

module.exports.getPhotoOfficiel= function (pilnum, callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PHOSUJET, PHOCOMMENTAIRE, PHOADRESSE FROM photo WHERE PHONUM =1 AND PILNUM=" + pilnum;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getPhotoNonOfficiel= function (pilnum, callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT PHOSUJET, PHOCOMMENTAIRE, PHOADRESSE FROM photo WHERE PHONUM !=1 AND PILNUM=" + pilnum;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};