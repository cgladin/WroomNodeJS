let db = require('../../configDb');

module.exports.getListeGrandPrix= function (callback){ // récupère la liste des grands prix
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNUM, GPNOM FROM grandprix ORDER BY GPNOM ASC";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getResultatGrandPrix= function (gpnum,callback){ // récupère les résultats d'un grand prix
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, PILPRENOM, TEMPSCOURSE,p.PILNUM FROM grandprix g JOIN course c ON g.GPNUM=c.GPNUM " +
                "JOIN pilote p ON p.PILNUM = c.PILNUM " +
                "WHERE g.GPNUM = " + gpnum +" ORDER BY TEMPSCOURSE ASC";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.listerGP= function (callback){ // liste les différents grands prix
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNUM, GPNOM, GPNBTOURS, GPCOMMENTAIRE FROM grandprix ORDER BY GPNOM ASC";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ajouterNouveauGP= function (nom,cirnum,date,tour,datemaj,commentaire,callback) { // ajoute un nouveau grand prix
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'INSERT INTO grandprix (CIRNUM,GPNOM,GPDATE,GPNBTOURS,GPDATEMAJ,GPCOMMENTAIRE)'
                +' VALUES ('+cirnum+',"'+nom+'","'+date[2]+'-'+date[1]+'-'+date[0]+'",'+tour+',"'+datemaj+'","'+commentaire+'")';
            console.log(sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getGP= function (num,callback){ // sélectionne les infos d'un grand prix
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNUM, GPNOM, YEAR(GPDATE) as ANNEE, MONTH(GPDATE) as MOIS,DAY(GPDATE) as JOUR,GPNBTOURS,GPCOMMENTAIRE" +
                " FROM grandprix WHERE GPNUM="+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.modifierGP= function (num,nom,cirnum,date,tour,datemaj,commentaire,callback) { // modifie les infos d'un grand prix
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'UPDATE grandprix ' +
                'SET CIRNUM='+cirnum+',GPNOM="'+nom+'",GPDATE="'+date[2]+'-'+date[1]+'-'+date[0]+'",' +
                'GPNBTOURS='+tour+',GPDATEMAJ="'+datemaj+'",GPCOMMENTAIRE="'+commentaire+'"'+
                ' WHERE GPNUM='+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.supprimerGP= function (num,callback){ // supprime un grand prix
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM grandprix WHERE GPNUM="+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getCirGP= function (num,callback) { // donne le gpnum d'un circuits
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNUM FROM grandprix JOIN circuit ON grandprix.CIRNUM=circuit.CIRNUM WHERE circuit.CIRNUM="+num;
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};