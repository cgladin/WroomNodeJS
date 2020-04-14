let db = require('../configDb');

module.exports.getListeEcurie = function (callback) { // Récupère la liste  des écuries
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT ECUNUM, PAYADRDRAP, ECUNOM FROM ecurie e INNER JOIN pays p ON p.PAYNUM=e.PAYNUM ORDER BY ECUNOM";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getNomEcurie= function (pilnum, callback){ // Récupère Le nom de l'écurie d'un pilote
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT ECUNOM FROM ecurie e JOIN pilote p ON e.ECUNUM=p.ECUNUM WHERE p.PILNUM= " + pilnum ;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailEcurie= function(ecunum, callback){ // Récupère les infos de l'écurie
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT ECUNOM, ECUNOMDIR, ECUADRSIEGE,ECUADRESSEIMAGE, PAYNOM FROM ecurie e JOIN pays p ON e.PAYNUM=p.PAYNUM WHERE ECUNUM= " + ecunum ;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getEcuriePilote= function(ecunum, callback){ // Récupère les pilotes liée à l'écurie
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, p.PILNUM, PILPRENOM,PILTEXTE,PHOADRESSE FROM ecurie e JOIN pilote p ON e.ECUNUM=p.ECUNUM  " +
                "JOIN photo ON photo.PILNUM=p.PILNUM WHERE PHONUM=1 AND e.ECUNUM=" + ecunum ;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
