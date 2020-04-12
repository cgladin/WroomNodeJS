let db = require('../configDb');

module.exports.deleteCoursePilote= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM course WHERE PILNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ajouterResultatPilote= function (gpnum,pilnum,temps,callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'INSERT INTO course (GPNUM,PILNUM,TEMPSCOURSE)'
                +' VALUES ('+gpnum+','+pilnum+',"'+temps[0]+':'+temps[1]+':'+temps[2]+'")';
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
