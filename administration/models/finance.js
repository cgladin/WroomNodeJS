let db = require('../../configDb');

module.exports.deleteEcurieFinance= function (num,callback) { // supprime les financements d'une écurie quand lle est supprimée
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM finance WHERE ECUNUM="+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ajoutSponsoriseEcurie= function (num,sponum, callback) { // ajoute un sponsor à une écurie
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'INSERT INTO finance (ECUNUM,SPONUM) VALUES ('+num+','+sponum+')';
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.supprimerSponsoriseEcurie= function (num, callback) { // supprimer un sponsor d'une écurie
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM finance WHERE SPONUM="+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};