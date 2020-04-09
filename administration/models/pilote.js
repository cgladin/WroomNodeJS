let db = require('../configDb');

module.exports.getListePilote= function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, PILPRENOM, PILDATENAIS, PILNUM FROM pilote GROUP BY PILNOM ASC";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ajouterNouveauPilote= function (prenom,nom,date,nationalite,ecurie,point,poid,taille,description,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "INSERT INTO pilote (PAYNUM,PILNOM,PILPRENOM,PILDATENAIS,PILPOINTS,PILPOIDS,PILTAILLE,PILTEXTE,ECUNUM)";
            sql = sql +" VALUES ("+nationalite+",'"+nom+"','"+prenom+"','"+date[2]+"-"+date[1]+"-"+date[0]+"',"+point+","+poid+","+taille+",'"+description+"',"+ecurie+")";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.deletePilote= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM pilote WHERE PILNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getPilote= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, PILPRENOM, YEAR(PILDATENAIS) as ANNEE, MONTH(PILDATENAIS) as MOIS,DAY(PILDATENAIS) as JOUR, PILNUM," +
                "PILPOINTS,PILPOIDS,PILTAILLE,PILTEXTE FROM pilote " +
                "WHERE PILNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ModifierPilote= function (num,prenom,nom,date,nationalite,ecurie,point,poid,taille,description,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "UPDATE pilote " +
                "SET PAYNUM="+nationalite+",PILNOM='"+nom+"',PILPRENOM='"+prenom+"',PILDATENAIS='"+date[2]+"-"+date[1]+"-"+date[0]+"'," +
                "PILPOINTS="+point+",PILPOIDS="+poid+",PILTAILLE="+taille+",PILTEXTE='"+description+"',ECUNUM="+ecurie+
                " WHERE PILNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};