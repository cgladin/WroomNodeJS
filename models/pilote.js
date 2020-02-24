let db = require('../configDb');

module.exports.getListeInitialPilote = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
                let sql = "SELECT DISTINCT SUBSTR(PILNOM, 1, 1) as initial FROM pilote ORDER BY initial";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getNomImagePilote= function (initial, callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT DISTINCT SUBSTR(PILNOM, 1, 1) as initial, PILNOM, PILPRENOM, p.PILNUM, PHOADRESSE FROM PILOTE p JOIN PHOTO ph ON p.PILNUM = ph.PILNUM WHERE PHONUM = '1' HAVING initial = '" + initial + "'";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailPilotePerso= function (pilnum, callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, PILPRENOM, PILDATENAIS, PILPOIDS, PILTAILLE, PILTEXTE, PAYNAT FROM PILOTE p JOIN PAYS pa ON p.PAYNUM = pa.PAYNUM WHERE p.PILNUM=" + pilnum;
            //console.log (sql);
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
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};



