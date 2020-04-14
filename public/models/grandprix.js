let db = require('../configDb');

module.exports.getListeGrandPrix= function (callback){  // Récupère  la liste des grand prix
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNUM, GPNOM, PAYNOM, PAYADRDRAP FROM grandprix g JOIN circuit c ON g.CIRNUM=c.CIRNUM JOIN pays p ON c.PAYNUM=p.PAYNUM";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailGrandPrix= function (gpnum,callback){ // Récupère  les infos d'un grand prix
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, PILPRENOM, TEMPSCOURSE FROM grandprix g JOIN course c ON g.GPNUM=c.GPNUM " +
                "JOIN pilote p ON p.PILNUM = c.PILNUM " +
                "WHERE g.GPNUM = " + gpnum +" ORDER BY TEMPSCOURSE ASC";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getCommentaireGP = function(num, callback) { // Récupère  le commentaire d'un grand prix
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPCOMMENTAIRE FROM grandprix WHERE gpnum = " + num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

// Récupérer le dernier resultat pour la page Home
module.exports.getDernierResultat = function (callback) { // Récupère le derniere resultat insérer
    db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT GPDATEMAJ, GPNOM, GPDATE, GPNUM FROM grandprix ORDER BY GPDATEMAJ DESC LIMIT 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
