/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ECUNUM, PAYADRDRAP, ECUNOM FROM " +
                            "ecurie e INNER JOIN pays p ";
						sql= sql + "ON p.PAYNUM=e.PAYNUM ORDER BY ECUNOM";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
module.exports.getNomEcurie= function (pilnum, callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT ECUNOM FROM ecurie e JOIN pilote p ON e.ECUNUM=p.ECUNUM WHERE p.PILNUM= " + pilnum + "";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailEcurie= function(ecunum, callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT ECUNOM, ECUNOMDIR, ECUADRSIEGE,ECUADRESSEIMAGE, PAYNOM FROM ecurie e JOIN pays p ON e.PAYNUM=p.PAYNUM WHERE ECUNUM= " + ecunum + "";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getEcuriePilote= function(ecunum, callback){
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PILNOM, PILNUM, PILPRENOM FROM ecurie e JOIN pilote p ON e.ECUNUM=p.ECUNUM WHERE e.ECUNUM= " + ecunum + "";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
