let db = require('../configDb');

module.exports.deletePhotoPilote= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM photo WHERE PILNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ajouterPhotoPilote = function(image,pilnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "INSERT INTO photo (PHONUM,PILNUM,PHOSUJET,PHOCOMMENTAIRE,PHOADRESSE)" +
                " VALUES(1,"+pilnum+",'Photo Identité','Photo Officielle','"+image+"')";
            connexion.query(sql, callback);
            //console.log(sql);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getImage= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PHOADRESSE FROM photo WHERE PHONUM=1 AND PILNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.ModifierPhotoPilote= function (num,image,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "UPDATE photo SET PHOADRESSE='"+image+"' WHERE PHONUM=1 AND PILNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};