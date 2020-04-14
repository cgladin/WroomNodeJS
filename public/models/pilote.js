let db = require('../configDb');

module.exports.getListeInitialPilote = function (callback) { // Récupère  la liste d'initiale des pilotes
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT DISTINCT SUBSTR(PILNOM, 1, 1) as initial FROM pilote ORDER BY initial";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getNomImagePilote= function (initial, callback){ // Récupère les images et nom des pilotes en fonction de la lettre selectionné
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT DISTINCT SUBSTR(PILNOM, 1, 1) as initial, PILNOM, PILPRENOM, p.PILNUM, PHOADRESSE FROM PILOTE p JOIN PHOTO ph ON p.PILNUM = ph.PILNUM WHERE PHONUM = '1' HAVING initial = '" + initial + "'";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailPilotePerso= function (pilnum, callback){ // Récupère les infos d'un pilote
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, PILPRENOM, PILDATENAIS, PILPOIDS, PILTAILLE, PILTEXTE, PAYNAT FROM PILOTE p JOIN PAYS pa ON p.PAYNUM = pa.PAYNUM WHERE p.PILNUM=" + pilnum;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailPiloteSponsor= function (pilnum, callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT SPONOM, SPOSECTACTIVITE FROM PILOTE p JOIN SPONSORISE s ON p.PILNUM = s.PILNUM JOIN SPONSOR sp ON s.SPONUM = sp.SPONUM WHERE p.PILNUM= " + pilnum ;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};



