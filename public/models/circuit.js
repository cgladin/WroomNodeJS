let db = require('../../configDb');

module.exports.getListeCircuit= function (callback){ // Récupère la liste des circuits
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT CIRNUM, CIRNOM, PAYADRDRAP FROM circuit c JOIN pays p ON c.PAYNUM=p.PAYNUM ORDER BY CIRNOM" ;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailCircuit= function (cirnum, callback){ // Récupère les infos d'un circuit
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT CIRNOM, CIRLONGUEUR, CIRNBSPECTATEURS, CIRADRESSEIMAGE, CIRTEXT, PAYNOM FROM circuit c JOIN pays p ON c.PAYNUM=p.PAYNUM WHERE CIRNUM="+cirnum;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};