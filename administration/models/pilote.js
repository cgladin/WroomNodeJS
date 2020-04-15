let db = require('../../configDb');

module.exports.getListePilote= function (callback) { // récupère la liste des pilotes
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, PILPRENOM, PILDATENAIS, PILNUM FROM pilote ORDER BY PILNOM ASC";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ajouterNouveauPilote= function (prenom,nom,date,nationalite,ecurie,point,poid,taille,description,callback) { // ajouter un nouveau pilote
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'INSERT INTO pilote (PAYNUM,PILNOM,PILPRENOM,PILDATENAIS,PILPOINTS,PILPOIDS,PILTAILLE,PILTEXTE,ECUNUM)';
            sql = sql +'VALUES ('+nationalite+',"'+nom+'","'+prenom+'","'+date[2]+'-'+date[1]+'-'+date[0]+'",'+point+','+poid+','+taille+',"'+description+'",'+ecurie+')';
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.deletePilote= function (num,callback) { // supprimer un pilote
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM pilote WHERE PILNUM="+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getPilote= function (num,callback) { // récupère les informations du pilote
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, PILPRENOM, YEAR(PILDATENAIS) as ANNEE, MONTH(PILDATENAIS) as MOIS,DAY(PILDATENAIS) as JOUR, PILNUM," +
                "PILPOINTS,PILPOIDS,PILTAILLE,PILTEXTE FROM pilote " +
                "WHERE PILNUM="+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ModifierPilote= function (num,prenom,nom,date,nationalite,ecurie,point,poid,taille,description,callback) { // modifie les infoirmations d'un pilote
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'UPDATE pilote ' +
                'SET PAYNUM='+nationalite+',PILNOM="'+nom+'",PILPRENOM="'+prenom+'",PILDATENAIS="'+date[2]+'-'+date[1]+'-'+date[0]+'",' +
                'PILPOINTS='+point+',PILPOIDS='+poid+',PILTAILLE='+taille+',PILTEXTE="'+description+'",ECUNUM='+ecurie+
                ' WHERE PILNUM='+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.deleteEcuriePilote= function (num,callback) { // supprime un pilote d'une écurie
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "UPDATE pilote SET ECUNUM=NULL WHERE ECUNUM="+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getPiloteSansResultat= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT pilote.PILNUM, pilote.PILNOM FROM pilote WHERE pilote.PILNUM NOT IN (SELECT course.PILNUM from course WHERE course.GPNUM ="+num+") AND pilote.ECUNUM IS NOT NULL";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};