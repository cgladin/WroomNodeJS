var db = require('../configDb');

////// Verifie  la validité du login

module.exports.loginCorrect = function(login, passwd, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            var sql = "SELECT login, passwd FROM login WHERE login = '" + login + "' AND passwd = '" + passwd + "'";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};