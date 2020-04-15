/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getEcuries = function (callback) { // selectionne juste le nom et numero ecurie pour les selects
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ECUNUM, ECUNOM FROM ecurie ORDER BY ECUNOM ASC";
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
module.exports.getListeEcurie = function (callback) { // Selectionne les écurie pour les lister dans /ecuries
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT ECUNUM, ECUNOM, ECUPOINTS FROM ecurie ORDER BY ECUNOM ASC";
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getEcurie = function (num,callback) { // selectionne une écurie pas numéro
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT  ECUNOM, ECUNOMDIR,ECUADRSIEGE, ECUPOINTS FROM ecurie WHERE ECUNUM="+num;
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getEcuriePilote = function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT ecurie.ECUNUM, ECUNOM FROM ecurie JOIN pilote ON pilote.ECUNUM=ecurie.ECUNUM WHERE PILNUM="+num;
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.ajouterNouvelleEcurie= function (nom,directeur,adresse,point,pays,fournPneu,image,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'INSERT INTO ecurie (FPNUM,ECUNOM,ECUNOMDIR,ECUADRSIEGE,ECUPOINTS,PAYNUM,ECUADRESSEIMAGE)';
            sql = sql +' VALUES ('+fournPneu+',"'+nom+'","'+directeur+'","'+adresse+'",'+point+','+pays+',"'+image+'")';
            //console.log (sql);
            connexion.query(sql, callback);

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
            let sql = "SELECT ECUADRESSEIMAGE FROM ecurie WHERE ECUNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.deleteEcurie= function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM ecurie WHERE ECUNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ModifierEcurie= function (num,nom,directeur,adresse,point,pays,fournPneu,image,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'UPDATE ecurie SET FPNUM='+fournPneu+' ,ECUNOM="'+nom+'",ECUNOMDIR="'+adresse+'" ,ECUADRSIEGE="'+adresse+'",ECUPOINTS='+point+' ,PAYNUM='+pays+' ,ECUADRESSEIMAGE="'+image+
                '" WHERE ECUNUM='+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getPoints = function (num,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT ecurie.ECUNUM, ECUPOINTS FROM ecurie JOIN pilote ON pilote.ECUNUM=ecurie.ECUNUM WHERE PILNUM="+num;
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.modifierPoints = function (num,ecunum,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="UPDATE ecurie SET ECUPOINTS="+num+" WHERE ECUNUM="+ecunum;
            console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getEcuriePiloteGP = function (num,callback) { // selectionne les ecurie des personne participant à un grandprix
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT ecurie.ECUNUM, pilote.PILNUM FROM ecurie RIGHT JOIN pilote ON pilote.ECUNUM=ecurie.ECUNUM JOIN course ON course.PILNUM=pilote.PILNUM " +
                "JOIN grandprix ON grandprix.GPNUM=course.GPNUM WHERE  course.GPNUM ="+num+" ORDER BY TEMPSCOURSE ASC";
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};