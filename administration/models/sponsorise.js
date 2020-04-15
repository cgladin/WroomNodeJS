let db = require('../../configDb');

module.exports.deleteSponsorPilote= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM sponsorise WHERE PILNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.deletePiloteSponsor= function (num,sponum,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM sponsorise WHERE PILNUM="+num+" AND SPONUM="+sponum;
            console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ajoutSponsorisePilote= function (pilnum,sponsor,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'INSERT INTO sponsorise (PILNUM,SPONUM)';
            sql = sql +'VALUES ('+pilnum+','+sponsor+')';
            //console.log (sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getPiloteSponsorise= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'SELECT s.PILNUM, PILNOM, PILPRENOM FROM sponsorise s JOIN pilote p ON s.PILNUM=p.PILNUM WHERE SPONUM='+num;
            //console.log (sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};