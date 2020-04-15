let db = require('../../configDb');

module.exports.getCircuits= function (callback) { //donne la liste des circuits
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT CIRNUM, CIRNOM, CIRLONGUEUR,CIRNBSPECTATEURS FROM circuit ORDER BY CIRNOM ASC";
            //console.log (sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getCircuit= function (num, callback) { //donne les infos sur 1 seul circuits
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT CIRNUM, CIRNOM, CIRLONGUEUR,CIRNBSPECTATEURS,CIRTEXT FROM circuit WHERE CIRNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.deleteCircuit= function (num,callback) { // Supprime un circuit
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM circuit WHERE CIRNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ajouterNouveauCircuit= function (nom,longueur,pays,image,nbspectateur,description,callback) { // Ajoute un circuit
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'INSERT INTO circuit (PAYNUM,CIRNOM,CIRLONGUEUR,CIRNBSPECTATEURS,CIRADRESSEIMAGE,CIRTEXT)'
           +' VALUES ('+pays+',"'+nom+'",'+longueur+','+nbspectateur+',"'+image+'","'+description+'")';
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.ModifierCircuit= function (num,nom,longueur,pays,image,nbspectateur,description,callback) { // Modifie un circuit
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = 'UPDATE circuit SET PAYNUM='+pays+',CIRNOM="'+nom+'",CIRLONGUEUR="'+longueur+'",CIRNBSPECTATEURS='+nbspectateur+',CIRADRESSEIMAGE="'+image+'",CIRTEXT="'+description+
                '" WHERE CIRNUM='+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.getImage= function (num,callback) { // Récupère l'image du circuit
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT CIRADRESSEIMAGE FROM circuit WHERE CIRNUM="+num;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

