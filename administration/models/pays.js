let db = require('../../configDb');

module.exports.getNationalite= function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PAYNUM, PAYNAT FROM pays ORDER BY PAYNAT ASC";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getPays= function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PAYNUM, PAYNOM FROM pays ORDER BY PAYNOM ASC";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getNatPilote= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT pays.PAYNUM, PAYNAT FROM pays JOIN pilote ON pays.PAYNUM=pilote.PAYNUM WHERE PILNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getPaysCircuit= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT pays.PAYNUM, PAYNOM FROM pays JOIN circuit ON pays.PAYNUM=circuit.PAYNUM WHERE CIRNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getPaysEcurie = function (num,callback) { // selectionne une écurie pas numéro
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT pays.PAYNUM, PAYNOM FROM pays JOIN ecurie ON pays.PAYNUM=ecurie.PAYNUM WHERE ECUNUM="+num;
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getFournPays = function (num,callback) { // selectionne une écurie pas numéro
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT pays.PAYNUM, PAYNOM FROM pays JOIN fourn_pneu ON pays.PAYNUM=fourn_pneu.PAYNUM WHERE FPNUM="+num;
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};