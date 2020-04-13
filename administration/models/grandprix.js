let db = require('../configDb');

module.exports.getListeGrandPrix= function (callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNUM, GPNOM FROM grandprix ORDER BY GPNOM ASC";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getResultatGrandPrix= function (gpnum,callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, PILPRENOM, TEMPSCOURSE,p.PILNUM FROM grandprix g JOIN course c ON g.GPNUM=c.GPNUM " +
                "JOIN pilote p ON p.PILNUM = c.PILNUM " +
                "WHERE g.GPNUM = " + gpnum +" ORDER BY TEMPSCOURSE ASC";
            //console.log (sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.listerGP= function (callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNUM, GPNOM, GPNBTOURS, GPCOMMENTAIRE FROM grandprix ORDER BY GPNOM ASC";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ajouterNouveauGP= function (nom,cirnum,date,tour,datemaj,commentaire,callback) {
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
module.exports.getGP= function (num,callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNUM, GPNOM, YEAR(GPDATE) as ANNEE, MONTH(GPDATE) as MOIS,DAY(GPDATE) as JOUR,GPNBTOURS,GPCOMMENTAIRE" +
                " FROM grandprix WHERE GPNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.modifierGP= function (num,nom,cirnum,date,tour,datemaj,commentaire,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'UPDATE grandprix ' +
                'SET CIRNUM='+cirnum+',GPNOM="'+nom+'",GPDATE="'+date[2]+'-'+date[1]+'-'+date[0]+'",' +
                'GPNBTOURS='+tour+',GPDATEMAJ="'+datemaj+'",GPCOMMENTAIRE="'+commentaire+'"'+
                ' WHERE GPNUM='+num;
            console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.supprimerGP= function (num,callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM grandprix WHERE GPNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
